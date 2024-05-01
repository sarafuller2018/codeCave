import { Link } from 'react-router-dom';

const ProjectList = ({ projects, title }) => {
    return (
        <>
            <div className="add-project-btn-div">
                <button className="add-project-btn">Add Project</button>
            </div>
        {projects &&
        projects.map((project) => (
        
            <div className="project-card-div">
                <div className="project-card" key={project.id}>
                    <div className="project-title-div">
                        <p className="project-title">{project.name}</p>
                    </div>
                    <div className="project-description-div">
                        <p className="project-description">{project.description}</p>
                    </div>
                    <div className="placeholder-img-div">
                        <img className="placeholder-img" src={project.image} />
                    </div>
                    <div className="view-project-btn-div" >
                        <Link
                            className="view-project-btn"
                            to={`/projects/${project.id}`}
                        >
                            <button className="view-project-btn">View Project</button>
                        </Link>

                    </div>
                    <div >
                        <p className="time-stamp">{project.createdAt}</p>
                    </div>
                </div>
            </div>
        ))}
        </>
    );
};

export default ProjectList;