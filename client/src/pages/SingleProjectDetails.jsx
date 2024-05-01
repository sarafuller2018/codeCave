import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import Header from '../components/Header/Header';
import React, { useState } from 'react';


const SingleProjectDetails = ({ user }) => {
    const { projectId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [emailPreview, setEmailPreview] = useState('');
    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const project = data?.project || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAskToContribute = async () => {
        if (!user || !project || !project.user || !project.user.email) {
            console.error('Invalid user or project data.');
            return;
        }
    
        const from = user.email;
        const to = project.user.email;
        const subject = 'Someone wants to help!';
        const text = `${user.userName} wants to help on your project.`;
    
        try {
            await sendEmail(from, to, subject, text);
            alert('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email');
        }
    };
    return (
        <>
            <Header />
            <div className="project-card-div">
                    <div className="project-card" key={project._id}>
                        <div className="project-title-div">
                            <p className="project-title">{project.name}</p>
                        </div>
                        <div className="project-description-div">
                            <p className="project-description">{project.description}</p>
                        </div>
                        <div className="placeholder-img-div">
                            <img className="placeholder-img" src={project.image} />
                        </div>
                        <div >
                            <p className="time-stamp">{project.createdAt}</p>
                        </div>
                <div className="contribute-btn-div">
                    <button className="contribute-btn" onClick={handleAskToContribute}>
                        Ask To Contribute
                    </button>
                        </div>
            </div>
            {showModal && (
                <div className="email-preview-modal">
                    <h2>Email Preview</h2>
                    <p><strong>From:</strong> {emailPreview.from}</p>
                    <p><strong>To:</strong> {emailPreview.to}</p>
                    <p><strong>Subject:</strong> {emailPreview.subject}</p>
                    <p><strong>Text:</strong> {emailPreview.text}</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
                </div>
        </>
    );
};

export default SingleProjectDetails;