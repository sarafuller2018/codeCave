import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import Header from '../components/Header/Header';
import { sendEmail } from '../../../server/utils/emailUtils';

const SingleProjectDetails = ({ user }) => {
    const { projectId } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const project = data?.project || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleAskToContribute = async () => {
        // if (!user || !project || !project.user || !project.user.email) {
        //     console.error('Invalid user or project data.');
        //     return;
        // }
    
        const from = "test@email.com";
        const to = "bernardo4430@gmail.com";
        const subject = 'Someone wants to help!';
        const text = ` wants to help on your project.`;
    
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
        </div>
        </>
    );
};

export default SingleProjectDetails;