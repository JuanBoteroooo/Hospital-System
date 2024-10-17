import React, { useState } from "react";
import "./Login.css";

import TallerV from "./assets/images/Taller V.png";
import imagen4 from "./assets/images/imagen 4.jpg";
import imagen6 from "./assets/images/imagen 6.jpg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="login-page">
            {/* Sección izquierda con una cuadrícula de imágenes */}
            <div className="left-section">
                <div className="image-grid">
                    <img src={imagen4} alt="image1" className="grid-image" />
                    <img src={TallerV} alt="image3" className="grid-image" />
                    <img src={imagen6} alt="image2" className="grid-image" />
                </div>
            </div>

            {/* Sección derecha para el formulario */}
            <div className="right-section">
                <div className="login-container">
                    <h1>Hello! Good Morning</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="username">Login your account</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                        </div>
                        <div className="input-group">
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </div>
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                        <a href="#" className="create-account">
                            Create Account
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
