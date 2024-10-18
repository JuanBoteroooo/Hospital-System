import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Asegúrate de que el archivo CSS esté importado correctamente
import axios from "axios"; // Importa axios

const Home = () => {
    const handleLogout = async () => {
        try {
            // Enviar la solicitud de logout al servidor
            const response = await axios.post("http://localhost:3000/logout");
            console.log("Logout successful:", response.data);
            // Aquí puedes redirigir al login después del logout
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li className="nav-item" onClick={handleLogout}>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Contenido principal del Home */}
            <div className="home-container">
                <h1>Welcome to the Home Page</h1>
                <p>This is the main dashboard after logging in or registering.</p>
            </div>
        </div>
    );
};

export default Home;
