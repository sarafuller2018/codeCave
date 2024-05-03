import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AuthService from '../../utils/auth';
import Auth from '../../utils/auth';

const ProjectList = ({ projects, title, ownerEmail }) => {

    const logout = () => {

        AuthService.logout()
    }

    return (
        <>
            <header>
            <div className="login-signup-btn-div">
                    {!Auth.loggedIn() && (
                        <>
                            <Link to="/login"><button className="header-login-btn">Login</button></Link>
                            <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
                        </>
                    )}

                    {Auth.loggedIn() && (
                        <button className='header-logout-btn' onClick={logout}>Logout</button>
                    )}
                </div>

                <div className="logo-div">
                    <img className="codecave-logo" src="/Images/codeCave(logo).svg" />
                </div>
                <div className="add-project-btn-div">
                    <Link to="/add-project"><button className="add-project-btn">Add Project</button></Link>
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
                                    <img className="placeholder-img" src="./Images/placeholder-img.svg" />
                                </div>
                                <div className="view-project-btn-div" >
                                    <Link
                                        to={`/projects/${project.id}`}>
                                        <button className="view-project-btn">View Project</button>
                                    </Link>

                                </div>
                                <div >
                                    <p className="time-stamp">{project.createdAt}</p>
                                </div>
                                <div>
                                    <p className="project-owner">{project.ownerEmail}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </header>
        </>
    );
};

export default ProjectList;