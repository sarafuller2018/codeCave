import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import { QUERY_PROJECTS, QUERY_ME } from '../utils/queries';
import { useState } from 'react';
import Auth from '../utils/auth';

const AddProject = () => {

    const navigate = useNavigate();

    const [projectState, setProjectState] = useState({
        name: "",
        description: "",
        githubProjectLink: "",
        image: "",
    })
    const [addProject, { error }] = useMutation(ADD_PROJECT, {
        refetchQueries: [
            { query: QUERY_PROJECTS },
            { query: QUERY_ME }
        ]
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProjectState({
            ...projectState,
            [name]: value,
        })

        console.log(projectState)
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addProject({
                variables: { ...projectState },
            });

            setProjectState({
                name: "",
                description: "",
                githubProjectLink: "",
                image: "",
            });

            alert("Project added!");
            navigate("/home");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <header>
                <div className="login-signup-btn-div">
                    <Link to="/login"><button className="header-login-btn">Login</button></Link>
                    <Link to="/signup"><button className="header-signup-btn">Sign Up</button></Link>
                </div>
                <div className="logo-div">
                    <Link to="/home"> <img className="codecave-logo" src="/Images/codeCave(logo).svg" /></Link>
                </div>

                {Auth.loggedIn() ? (
                    <div className="form-div">
                        <form onSubmit={handleFormSubmit} className='add-project-form-card'>
                            <div className="login-text-div">
                                <h4 className="login-text">Add Project</h4>
                            </div>

                            {error && (
                                <div>
                                    <p className="error-text">Error with adding project. Please try again!</p>
                                </div>
                            )}

                            <div className='input-div'>
                                <div className="add-project-title-div">
                                    <input
                                        className="project-title-input"
                                        placeholder="Project Title"
                                        name="name"
                                        type="text"
                                        value={projectState.name}
                                        onChange={handleChange}
                                    />
                                    <label className="form-label" >
                                    </label>
                                </div>
                                <div className="add-project-title-div">
                                    <input
                                        className="project-title-input"
                                        placeholder="GitHub Repo Link"
                                        name="githubProjectLink"
                                        type="text"
                                        value={projectState.githubProjectLink}
                                        onChange={handleChange}
                                    />
                                    <label className="form-label" >
                                    </label>
                                </div>
                                <div className="add-project-title-div">
                                    <input
                                        className="project-description-input"
                                        placeholder="Description"
                                        name="description"
                                        type="text"
                                        value={projectState.description}
                                        onChange={handleChange}
                                    />
                                    <label className="form-label" >
                                    </label>
                                </div>

                                <div className="add-project-title-div">
                                    <div className="import-media">
                                        <img className="import-logo" src="/Images/import-logo.png" />
                                        <p className='import-title'>Import Media</p>
                                        <button className='upload-btn'>Upload</button>
                                    </div>
                                </div>
                                <div className='done-btn-div'>
                                    <button className='done-btn'>Done</button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p>
                        You need to be logged in to share your thoughts. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )}
            </header>
        </>
    );
};

export default AddProject;