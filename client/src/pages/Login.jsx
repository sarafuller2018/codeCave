import Auth from '../utils/auth';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const Login = (props) => {
    const navigate = useNavigate();

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

    useEffect(() => {
        if (Auth.loggedIn()) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <section>
            <div className="logo-div">
                <Link to="/home"> <img className="codecave-login-logo" src="/Images/codeCave(login-logo).svg" /></Link>
            </div>
            <div className="form-div">
                <form className="form-card" onSubmit={handleFormSubmit}>
                    <div className="login-text-div">
                        <h4 className="login-text">Login</h4>
                    </div>

                    {error && (
                        <div className="error-text">
                            {error.message}
                        </div>
                    )}
                    <div className="input-div">
                        <div className="email-div">
                            <input
                                className="login-input"
                                placeholder="Your Email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <label className="form-label" ></label>
                        </div>
                        <div className="password-div">
                            <input
                                className="login-input"
                                placeholder="Your Password"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <label className="form-label" ></label>
                        </div>
                        <div className="login-btn-div">
                            <button
                                className="login-btn"
                                style={{ cursor: 'pointer' }}
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                        <div className='or-div'>
                            <p className='or'>or</p>
                        </div>
                        <div className='signup-btn-div'>
                            <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;