import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
// import { QUERY_SINGLE_PROJECT } from '../utils/queries';


const ProjectDetails = () => {
    const { projectId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
        variables: { projectId: projectId},
    });

    const project = data?.project || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='project-container'>
            <h2 className='project-title'>
                {project.title}
            </h2>
        </div>
    );
};

export default ProjectDetails;