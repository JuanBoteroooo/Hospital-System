import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleBoExecution = async (boType) => {
        try {
            const response = await axios.post("http://localhost:3000/toProcess", {
                boType: boType,
                action: "execute",
            });
            console.log("Respuesta del servidor:", response.data);
            navigate(`/toProcess/${boType}`);
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
    };

    return (
        <div className="home-container">
            {/* Barra de navegación */}
            <nav className="navbar">
                <div className="navbar-logo">CCARDIOZ</div>
                <div className="navbar-buttons">
                    <button onClick={() => handleBoExecution("Cita")} className="navbar-btn">
                        Crear Cita
                    </button>
                    <button onClick={() => handleBoExecution("OtroProceso")} className="navbar-btn">
                        Ejecutar Otro Proceso
                    </button>
                    <button onClick={() => navigate("/logout")} className="navbar-btn">
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* Contenido Principal */}
            <div className="main-content">
                <h1>Bienvenido a Nuestro Sistema</h1>
                <p>Selecciona el tipo de BO que quieres ejecutar:</p>
                <div className="action-buttons">
                    <button onClick={() => handleBoExecution("Cita")} className="btn-primary">
                        Crear Cita
                    </button>
                    <button onClick={() => handleBoExecution("OtroProceso")} className="btn-primary">
                        Ejecutar Otro Proceso
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
