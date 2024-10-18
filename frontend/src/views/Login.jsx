import React, { useState } from "react";
import "./Login.css";
import imagen4 from "../assets/images/imagen4.jpg"; // Importa la imagen directamente
import axios from "axios"; // Importa axios

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Enviar los datos de login al servidor
            const response = await axios.post("http://localhost:3000/login", {
                username,
                password,
            });
            console.log("Response:", response.data);
            // Aquí puedes redirigir o manejar el login exitoso
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-page">
            {/* Sección izquierda con solo una imagen */}
            <div className="left-section">
                <img src={imagen4} alt="Login visual" className="single-image" />
            </div>

            {/* Sección derecha con el formulario */}
            <div className="right-section">
                <div className="login-container">
                    <h1>Hello! Welcome to CCARDIOZ</h1>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="username">Log in your account</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                        </div>
                        <div className="input-group">
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
