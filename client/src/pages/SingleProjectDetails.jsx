import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT, QUERY_COMMENTS, QUERY_USER_EMAIL, QUERY_PROJECTS } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CommentList from '../components/CommentList/CommentList';
import CommentForm from '../components/CommentForm/CommentForm';
import { useState } from 'react';
import AuthService from '../utils/auth';
import Auth from '../utils/auth';

const SingleProjectDetails = () => {

    const navigate = useNavigate();

    const { projectId } = useParams();
    const userId = AuthService.getUserId(); // Get user ID using AuthService
    console.log(projectId)

    const token = localStorage.getItem('id_token'); // Get token from localStorage
    const logged = token && !AuthService.isTokenExpired(token); // Check if token exists and is not expired
    console.log("is loggedin" + " " + logged); // Output the result of the check

    const { loading: userLoading, data: userData } = useQuery(QUERY_USER_EMAIL, {
        variables: { userId: userId }, // Provide the user ID here
    });


    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const [removeProject] = useMutation(REMOVE_PROJECT, {
        refetchQueries: [
            { query: QUERY_PROJECTS }
        ]
    });

    const project = data?.project || {};
    const userEmail = userData?.user?.email;
    const userName = userData?.user?.userName;
    console.log(userEmail)
    console.log(userName)
    console.log(userName + logged)

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
        if (!logged) {
            alert('You need to be signed in to collaborate.'); // Display an alert message
            return;
        }

        sendEmail(); // Call sendEmail when the button is clicked
    };

    const handleAddComment = (commentText) => {
        // Assuming project.comments is an array
        const newComment = { text: commentText, user: userName }; // Change "username" to the actual username
        const updatedComments = [...project.comments, newComment];

    };

    const [display, setDisplay] = useState(false);
    const toggleForm = () => {
        setDisplay(!display);
    };

    const handleRemoveProject = async () => {
        console.log("Removing project with ID:", projectId);
        try {
            await removeProject({ variables: { projectId: projectId } });

            confirm("Are you sure you want to delete this project?");
            alert("Project successfully deleted.");
            navigate("/home");
        } catch (err) {
            console.error("Error removing project:", err)
        }
    }

    console.log(logged)
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
    const logout = () => {

        AuthService.logout()
    }

    return (
        <>
            <header>
                <div className="login-signup-btn-div">
                    <Link to="/login"><button className="header-login-btn">Login</button></Link>
                    <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
                    <button className='header-logout-btn' onClick={logout}>Logout</button>
                </div>
                <div className="logo-div">
                    <Link to="/home"> <img className="codecave-logo" src="/Images/codeCave(logo).svg" /></Link>
                </div>
                <div className="emailMessage">
                    {message} {/* Render message */}
                </div>
                <div className="single-project-card-div">
                    <div className="single-project-card" key={project.id}>
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
                            <CommentForm projectId={project.id} user={userName} isOpen={display} addComment={handleAddComment} />
                        </form>
                        <div className='time-stamp-div' >
                            <p className="single-project-time-stamp">{project.createdAt}</p>
                        </div>
                        <div className='time-stamp-div'>
                            <p className="project-owner">{project.ownerEmail}</p>
                        </div>
                        <button
                            className={`comment-btn ${display ? "hide" : ""}`}
                            onClick={toggleForm}>
                            Comment
                        </button>
                        <div className="comment-btn-div">
                            <button className={`collab-btn ${display ? "hide" : ""}`} onClick={handleContributeClick}>Collaborate</button>
                            {Auth.loggedIn() && project.ownerEmail === userEmail && (
                                <button className="remove-project-btn" onClick={handleRemoveProject}>Remove Project</button>
                            )}
                        </div>
                    </div>

                    <div className="comment-section-div">
                        <CommentList comments={project.comments} />
                    </div>

                </div>
            </header>
        </>
    );
};

export default SingleProjectDetails;