import React, { useState } from "react";
import "./Login.css"; // Podemos reutilizar el mismo CSS

// Importa las imágenes
import TallerV from "./assets/images/Taller V.png";
import imagen4 from "./assets/images/imagen 4.jpg";
import imagen6 from "./assets/images/imagen 6.jpg";
import axios from "axios"; // Importar Axios

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Manejo del envío del formulario
    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/register", {
                firstname,
                lastname,
                username,
                email,
                password,
            });

            console.log("Registro exitoso:", response.data);
            // Aquí puedes manejar lo que ocurre después de un registro exitoso,
            // como redirigir al usuario o mostrar un mensaje de éxito.
        } catch (error) {
            setErrorMessage("Error en el registro. Por favor, intenta de nuevo.");
            console.error("Error en el registro:", error);
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
                    <h1>Create an Account</h1>
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </div>
                        <button type="submit" className="login-btn">
                            Register
                        </button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <a href="/login" className="create-account">
                            Back to Login
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
