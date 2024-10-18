import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Asegúrate de que el archivo CSS esté importado correctamente

const Home = () => {
    return (
        <div className="home-page">
            {" "}
            {/* Añadir una clase general si es necesario */}
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
                    <li className="nav-item">
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
