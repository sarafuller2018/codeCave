import { Link } from 'react-router-dom';

const Header = () => {
    return (
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
            {/* <div className="buttons-div">
                <button className="new-btn" id="nav-btns">
                    New
                </button>
                <button className="ip-btn" id="nav-btns">
                    In Progress
                    </button>
                <button className="fin-btn" id="nav-btns">Finished</button>
            </div> */}
            <div className="divider">
                <hr />
            </div>
        </header>
    );
};

export default Header;