import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT, QUERY_COMMENTS } from '../utils/queries';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentList from '../components/CommentList/CommentList';
import CommentForm from '../components/CommentForm/CommentForm';
import { useState } from 'react';


const SingleProjectDetails = () => {
    const { projectId } = useParams();


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const project = data?.project || {};
    const [emailStatus, setEmailStatus] = useState(null); // State to track email status

    const sendEmail = async () => {
        const url = 'http://localhost:3001/api/send-email';
        const data = {
            toEmail: project.ownerEmail, // Use project.ownerEmail here
            subject: 'Test Email',
            text: `This is a test email sent from your MERN stack project.`
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

    const [openCommentForm, setOpenCommentForm] = useState(false);
    const toggleForm = () => {
        setOpenCommentForm(!openCommentForm);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    let message = null; // Initialize message variable

    if (emailStatus === 'success') {
        message = <div>Email sent successfully!</div>;
    } else if (emailStatus === 'error') {
        message = <div>Error sending email. Please try again later.</div>;
    }
    
    return (
        <>
            <header>
<<<<<<< HEAD
            <div className="login-signup-btn-div">
                <Link to="/login"><button className="header-login-btn">Login</button></Link>
                <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
            </div>
            <div className="logo-div">
            <Link to="/home"> <img className="codecave-logo" src="/Images/codeCave(logo).svg" /></Link> 
            </div>
            <div className ="emailMessage">
                {message } {/* Render message */}
            </div>
            
            <div className="project-card-div">
                <div className="single-project-card" key={project._id}>
                    <div className="project-title-div">
                        <p className="project-title">{project.name}</p>
                    </div>
                    <div className="project-description-div">
                        <p className="project-description">{project.description}</p>
                    </div>
                    <div className="placeholder-img-div">
                        <img className="placeholder-img" src="../Images/placeholder-img.svg" />
                    </div>
                    <div >
                        <p className="time-stamp">{project.createdAt}</p>
                    </div>
                    <div className="comment-btn-div">
                        <button className='comment-btn' onClick={toggleForm}>Comment</button>
                        <button className='collab-btn' onClick={handleContributeClick}>Collaborate</button>
                    </div>
=======
                <div className="login-signup-btn-div">
                    <Link to="/login"><button className="header-login-btn">Login</button></Link>
                    <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
>>>>>>> main
                </div>
                <div className="logo-div">
                    <Link to="/home"> <img className="codecave-logo" src="/Images/codeCave(logo).svg" /></Link>
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
                            <input className='comment-input' placeholder='Leave Comment'/>
                        </form>
                        <div className='time-stamp-div' >
                            <p className="single-project-time-stamp">{project.createdAt}</p>
                        </div>
                        <div className="comment-btn-div">
                            <button className='comment-btn' onClick={toggleForm}>Comment</button>
                            <button className='collab-btn' onClick={handleContributeClick}>Collaborate</button>
                        </div>
                    </div>
                
    
                <CommentForm isOpen={openCommentForm} toggleForm={toggleForm} />
                
                <div className='comment-section-div'>
                    <CommentList comments={project.comments} />
                </div>
            </div>
            </header>
        </>
    );
};

export default SingleProjectDetails;