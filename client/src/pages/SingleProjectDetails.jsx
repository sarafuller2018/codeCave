import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT, QUERY_COMMENTS, QUERY_USER_EMAIL } from '../utils/queries';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentList from '../components/CommentList/CommentList';
import CommentForm from '../components/CommentForm/CommentForm';
import { useState } from 'react';
import AuthService from '../utils/auth';

const SingleProjectDetails = () => {
    const { projectId } = useParams();
    const userId = AuthService.getUserId(); // Get user ID using AuthService
    console.log(projectId)

    const { loading: userLoading, data: userData } = useQuery(QUERY_USER_EMAIL, {
        variables: { userId: userId }, // Provide the user ID here
    });


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const project = data?.project || {};
    const userEmail = userData?.user?.email;
    const userName = userData?.user?.userName;
    console.log(userEmail)
    console.log(userName)

    const [emailStatus, setEmailStatus] = useState(null); // State to track email status

    const sendEmail = async () => {
        const url = 'http://localhost:3001/api/send-email';
        const data = {
            toEmail: project.ownerEmail, // Use project.ownerEmail here
            subject: 'Collaboration Request',
            text: `The user ${userName} is interested in collaborating with you on your project "${project.name}" . Get in contact with them ${userEmail}`
        };

        try {
            const response = await axios.post(url, data);
            setEmailStatus('success'); // Set state to 'success' if email is sent successfully
        } catch (error) {
            setEmailStatus('error'); // Set state to 'error' if there is an error sending email
        }
    };

    const handleContributeClick = () => {
        sendEmail(); // Call sendTestEmail when the button is clicked
    };

    const handleAddComment = (commentText) => {
        // Assuming project.comments is an array
        const newComment = { text: commentText, user: userName }; // Change "username" to the actual username
        const updatedComments = [...project.comments, newComment];

    };

    const [openCommentForm, setOpenCommentForm] = useState(false);
    const toggleForm = () => {
        setOpenCommentForm(!openCommentForm);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    let message = null; // Initialize message variable

    if (emailStatus === 'success') {
        message = <div className="error-message-div"><div className='success-message'>Email sent successfully!</div></div>;
    } else if (emailStatus === 'error') {
        message = <div className="error-message-div"><div className='error-message'>Error sending email. Please try again later.</div></div>;
    }
    console.log(project.comments)
    return (
        <>
            <header>
                <div className="login-signup-btn-div">
                    <Link to="/login"><button className="header-login-btn">Login</button></Link>
                    <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
                </div>
                <div className="logo-div">
                    <Link to="/home"> <img className="codecave-logo" src="/Images/codeCave(logo).svg" /></Link>
                </div>
                <div className="emailMessage">
                    {message} {/* Render message */}
                </div>
                <div className="single-project-card-div">
                    <div className="single-project-card" key={project._id}>
                        <div className="project-title-div">
                            <p className="project-title">{project.name}</p>
                        </div>
                        <div className="single-project-description-div">
                            <p className="single-project-description">{project.description}</p>
                        </div>
                        <div className="single-placeholder-img-div">
                            <img className="single-placeholder-img" src="../Images/placeholder-img.svg" />
                        </div>
                    
                        <form>
                            <CommentForm projectId={projectId} isOpen={false} toggleForm={() => { }} addComment={handleAddComment} />
                        </form>
                        <div className='time-stamp-div' >
                            <p className="single-project-time-stamp">{project.createdAt}</p>
                        </div>
                        <button
                        className='comment-btn'>
                        Comment
                    </button>
                        <div className="comment-btn-div">
                            <button className='collab-btn' onClick={handleContributeClick}>Collaborate</button>
                        </div>
                    </div>

                    <div className="comment-section-div">
                        <CommentList comments={project.comments} />
                    </div>


                    <CommentForm isOpen={openCommentForm} toggleForm={toggleForm} />
                </div>
            </header>
        </>
    );
};

export default SingleProjectDetails;