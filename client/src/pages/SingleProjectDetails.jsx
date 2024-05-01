import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import axios from 'axios';


const SingleProjectDetails = (projects) => {
    const { projectId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId},
    });

    const project = data?.project || {};

    const sendEmail = async () => {
        const url = 'http://localhost:3001/api/send-email';
        const data = {
            toEmail: "bernardo4430@gmail.com",
            subject: 'Test Email',
            text: 'This is a test email sent from your MERN stack project.'
        };

        try {
            const response = await axios.post(url, data);
            console.log('Email sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleContributeClick = () => {
        sendEmail(); // Call sendTestEmail when the button is clicked
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
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
                <button className="contribute-btn" onClick={handleContributeClick}>Ask To Contribute</button>
            </div>
        </div>
    </div>
    );
};

export default SingleProjectDetails;