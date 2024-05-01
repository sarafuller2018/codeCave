import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddProject = () => {

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
                <div className="form-div">
                    <form className='add-project-form-card'>
                        <div className="login-text-div">
                            <h4 className="login-text">Add Project</h4>
                        </div>
                        <div className='input-div'>
                            <div className="add-project-title-div">
                                <input
                                    className="project-title-input"
                                    placeholder="Project Title"
                                    name="email"
                                    type="email"
                                />
                                <label className="form-label" >
                                </label>
                            </div>
                            <div className="add-project-title-div">
                                <input
                                    className="project-description-input"
                                    placeholder="Description"
                                    name="email"
                                    type="email"
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
            </header>
        </>
    );
}

export default AddProject;