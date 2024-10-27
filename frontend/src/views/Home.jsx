import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Gestión de Citas y Otros BO</h1>
            <div className="buttons-container">
                <button onClick={() => navigate("/crear-cita")} className="btn">
                    Crear Cita
                </button>
                <button onClick={() => navigate("/ver-cita")} className="btn">
                    Ver Cita
                </button>
                <button onClick={() => navigate("/modificar-cita")} className="btn">
                    Modificar Cita
                </button>
                <button onClick={() => navigate("/eliminar-cita")} className="btn">
                    Eliminar Cita
                </button>
                <button onClick={() => navigate("/login")} className="btn">
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Home;
