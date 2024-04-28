

const Header = () => {
    return (
        <header>
            <div className="login-signup-btn-div">
                <button className="login-signup-btn">Login/Sign Up</button>
            </div>
            <div className="logo-div">
                <img className="codecave-logo" src="./Images/codeCave(logo).svg" />
            </div>
            <div className="buttons-div">
                <button className="new-btn">New</button>
                <button className="btn">In Progress</button>
                <button className="btn">Finished</button>
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
                </div>
            </div>

        </header>
    );
};

export default Header;