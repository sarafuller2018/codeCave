// login page
const Login = () => {
    return (
        <section>
            <div className="logo-div">
                <img className="codecave-login-logo" src="./Images/codeCave(login-logo).svg" />
            </div>
            <div className="form-div">
                <form className="form-card">
                    <div className="login-text-div">
                        <p className="login-text">Login</p>
                    </div>
                    <div className="input-div">
                        <div className="email-div">
                            <input className="login-input" type="email" placeholder="E-mail" 
                                name="email" onChange />
                            <label className="form-label" ></label>
                        </div>
                        <div className="password-div">
                            <input className="login-input" type="text" placeholder="Password"
                                name="userName" onChange />
                            <label className="form-label" ></label>
                        </div>
                        <div className="login-btn-div">
                            <button className="login-btn">Login</button>
                        </div>
                        <div className="or-div">
                            <p className="or">or</p>
                        </div>
                        <div className="signup-btn-div">
                            <button className="signup-btn">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="signup-form-div">
                <form className="form-card" id="signup-form-card">
                    <div className="login-text-div">
                        <p className="login-text">Sign Up</p>
                    </div>
                    <div className="name-div">
                            <input className="name-input" type="text" placeholder="First Name" 
                                name="name" onChange />
                            <label className="form-label" ></label>
                            <input className="name-input" type="text" placeholder="Last Name" 
                                name="name" onChange />
                            <label className="form-label" ></label>
                        </div>
                    <div className="input-div">
                        <div className="email-div">
                            <input className="login-input" type="email" placeholder="E-mail" 
                                name="email" onChange />
                            <label className="form-label" ></label>
                        </div>
                        <div className="password-div">
                            <input className="login-input" type="text" placeholder="Set Password"
                                name="userName" onChange />
                            <label className="form-label" ></label>
                        </div>
                        <div className="login-btn-div">
                            <button className="login-btn">Sign Up</button>
                        </div>
                        <div className="or-div">
                            <p className="or">or</p>
                        </div>
                        <div className="signup-btn-div">
                            <button className="signup-btn">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;