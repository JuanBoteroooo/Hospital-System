import React from "react";
import "./Login.css"; // Reutilizando el mismo CSS que login y register

// Importa las imágenes
import TallerV from "./assets/images/Taller V.png";
import imagen4 from "./assets/images/imagen 4.jpg";
import imagen6 from "./assets/images/imagen 6.jpg";

const Home = () => {
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

            {/* Sección derecha con el contenido del Home */}
            <div className="right-section">
                <div className="login-container">
                    <h1>Welcome to the Home Page</h1>
                    <p>This is your main dashboard after logging in.</p>
                    <ul>
                        <li>View your profile</li>
                        <li>Manage settings</li>
                        <li>Log out</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
