import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import imagen4 from "../assets/images/imagen4.jpg";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        try {
            const response = await axios.post("http://localhost:3000/login", { username, password }, { withCredentials: true });
            console.log("Login response:", response);
            if (response.status === 200) {
                navigate("/"); // Navega a la página Home
            }
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response && error.response.status === 401) {
                alert("Unauthorized: Please check your credentials.");
            } else {
                alert("An error occurred during login.");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="left-section">
                <img src={imagen4} alt="Login visual" className="single-image" />
            </div>
            <div className="right-section">
                <div className="login-container">
                    <h1>Hello! Welcome to CCARDIOZ</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </div>
                        <button type="submit" className="login-btn">
                            Log in
                        </button>
                    </form>
                    <a href="/register" className="forgot-password">
                        Create Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
