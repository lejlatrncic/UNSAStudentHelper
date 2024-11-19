import React, { useState } from 'react';
import { adminLogin } from '../../firebase'; // Provjerite putanju'../../firebase'; 

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await adminLogin(email, password);
            setError("Uspjesno");
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container"> {/* Added container for centering */}
            <div className="login-box">
                <div className="text-center mb-3">
                    <h1 className="text-primary"><b>UNSA</b> Student Helper</h1>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Prijavi se</p>

                        {error && <p className="text-danger">{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="input-group mb-3">
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required className="form-control" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required className="form-control" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;