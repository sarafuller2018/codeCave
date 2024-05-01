import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import Header from '../components/Header/Header';

const SingleProjectDetails = () => {
    const { projectId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId },
    });

    const project = data?.project || {};

    if (loading) {
        return <div>Loading...</div>;
    }
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
                </div>
            </div>
        </>
    );
};

export default SingleProjectDetails;