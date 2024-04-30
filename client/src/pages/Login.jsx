import Auth from '../utils/auth';

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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const Login = (props) => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    className="form-input"
                                    placeholder="Your Email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="Your Password"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;