// Dev Note: SVG icons are currently commented out because I can't properly align them and make them look
//  but I 
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="login-signup-btn-div">
                <Link to="/login"><button className="login-signup-btn">Login</button></Link>
                <Link to="/signup"><button className="login-signup-btn">Sign Up</button></Link>
            </div>
            <div className="logo-div">
                <img className="codecave-logo" src="./Images/codeCave(logo).svg" />
            </div>
            <div className="buttons-div">
                <button className="new-btn" id="nav-btns">
                    {/* <img className="oreIcon" src="./Images/ore.svg" /> */}
                    New
                </button>
                <button className="ip-btn" id="nav-btns">
                {/* <img className="oreIcon" src="./Images/mined_ore.svg" /> */}
                    In Progress
                    </button>
                <button className="fin-btn" id="nav-btns">Finished</button>
            </div>
            <div className="divider">
            <hr/>
            </div>
            <div className="add-project-btn-div">
                <button className="add-project-btn">Add Project</button>
            </div>

            <div className="project-card-div">
                <div className="project-card">
                    <div className="project-title-div">
                    <p className="project-title">Project Title</p>
                    </div>
                    <div className="project-description-div">
                        <p className="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet mi in ipsum rhoncus, nec venenatis dolor lacinia. Curabitur ut faucibus urna, at malesuada ligula. In hac habitasse platea dictumst. Mauris feugiat est at sem gravida tempor. Suspendisse aliquam eu enim eu luctus. Donec sagittis eros commodo, tincidunt odio eu, tempus enim.</p>
                    </div>
                    <div className="placeholder-img-div">
                        <img className="placeholder-img" src="./Images/placeholder-img.svg"/>
                    </div>
                    <div className="view-project-btn-div" >
                        <button className="view-project-btn">View Project</button>
                    </div>
                    <div >
                        <p className="time-stamp">Posted on 04/26/2024</p>
                    </div>
                </div>
            </div>
            <div className="project-card-div">
                <div className="project-card">
                    <div className="project-title-div">
                    <p className="project-title">Project Title</p>
                    </div>
                    <div className="project-description-div">
                        <p className="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet mi in ipsum rhoncus, nec venenatis dolor lacinia. Curabitur ut faucibus urna, at malesuada ligula. In hac habitasse platea dictumst. Mauris feugiat est at sem gravida tempor. Suspendisse aliquam eu enim eu luctus. Donec sagittis eros commodo, tincidunt odio eu, tempus enim.</p>
                    </div>
                    <div className="placeholder-img-div">
                        <img className="placeholder-img" src="./Images/placeholder-img.svg"/>
                    </div>
                    <div className="view-project-btn-div" >
                        <button className="view-project-btn">View Project</button>
                    </div>
                    <div >
                        <p className="time-stamp">Posted on 04/26/2024</p>
                    </div>
                </div>
            </div>
            <div className="project-card-div">
                <div className="project-card">
                    <div className="project-title-div">
                    <p className="project-title">Project Title</p>
                    </div>
                    <div className="project-description-div">
                        <p className="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet mi in ipsum rhoncus, nec venenatis dolor lacinia. Curabitur ut faucibus urna, at malesuada ligula. In hac habitasse platea dictumst. Mauris feugiat est at sem gravida tempor. Suspendisse aliquam eu enim eu luctus. Donec sagittis eros commodo, tincidunt odio eu, tempus enim.</p>
                    </div>
                    <div className="placeholder-img-div">
                        <img className="placeholder-img" src="./Images/placeholder-img.svg"/>
                    </div>
                    <div className="view-project-btn-div" >
                        <button className="view-project-btn">View Project</button>
                    </div>
                    <div >
                        <p className="time-stamp">Posted on 04/26/2024</p>
                    </div>
                </div>
            </div>
            <div className="add-project-btn-2-div">
                <button className="add-project-btn-2">+</button>
            </div>
        </header>
    );
};

export default Header;