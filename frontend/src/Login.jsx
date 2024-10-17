import React, { useState } from "react";
import "./Login.css";
import axios from "axios"; // Importar Axios

// Importa las imágenes
import TallerV from "./assets/images/Taller V.png";
import imagen4 from "./assets/images/imagen 4.jpg";
import imagen6 from "./assets/images/imagen 6.jpg";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Para manejar errores

    // Manejo del envío del formulario
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username,
                password,
            });

            console.log("Login exitoso:", response.data);
            // Aquí puedes manejar lo que ocurre después de un login exitoso,
            // como redirigir al usuario a otra página o guardar el token.
        } catch (error) {
            setErrorMessage("Error al iniciar sesión. Por favor, verifica tus credenciales.");
            console.error("Error en el login:", error);
        }
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
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
