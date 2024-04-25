import { Link } from 'react-router-dom';

const ProjectList = ({ projects, title}) => {
    return (
        <section className='projects-container'>
            <h2>{title}</h2>
            {projects &&
            projects.map((project) => (
                <figure className='project-item' key={project._id}>
                    <h3 className='project-title'>{project.name}</h3>
                    <img src={project.img} className='project-image'/>

                    <Link
                    className="view-project-btn"
                    to={`/projects/${project._id}`}
                    >
                        View Project Details
                    </Link>
                </figure>
            ))}
        </section>
    )
}

export default ProjectList;