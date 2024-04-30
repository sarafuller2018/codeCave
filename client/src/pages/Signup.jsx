import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useState } from 'react';

const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        githubProfileLink: ''
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div className="logo-div">
                <img className="codecave-login-logo" src="./Images/codeCave(login-logo).svg" />
            </div>
            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                </p>
            ) : (
                <div className="signup-form-div">
                    <form onSubmit={handleFormSubmit} className="form-card" id="signup-form-card">
                        <div className="login-text-div">
                            <p className="login-text">Sign Up</p>
                        </div>

                        {error && (
                            <div className="error-text">
                                <p>Error with signup. Please try again!</p>
                            </div>
                        )}
                        
                        <div className="userName-div">
                            <input className="username-input" type="text" placeholder="Username"
                                name="userName" value={formState.userName}
                                onChange={handleChange} />
                            <label className="form-label" ></label>
                        </div>
                        <div className="input-div">
                            <div className="email-div">
                                <input className="login-input" type="email" placeholder="E-mail"
                                    name="email" value={formState.email}
                                    onChange={handleChange} />
                                <label className="form-label" ></label>
                            </div>
                            <div className="password-div">
                                <input className="login-input" type="password" placeholder="Set Password"
                                    name="password" value={formState.password}
                                    onChange={handleChange} />
                                <label className="form-label" ></label>
                            </div>
                            <div className="github-div">
                                <input className="login-input" type="text" placeholder="Github Link"
                                    name="githubProfileLink" value={formState.githubProfileLink}
                                    onChange={handleChange} />
                                <label className="form-label" ></label>
                            </div>
                            <div className="login-btn-div">
                                <button className="login-btn">Sign Up</button>
                            </div>
                            <div className='or-div'>
                                <p className='or'>or</p>
                            </div>
                            <div className='signup-btn-div'>
                                <button className="signup-btn">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
};

export default Signup;