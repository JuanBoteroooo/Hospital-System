import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../components/navbar";
import Card from "../components/card";
import Loading from "../components/loading"; // Importa el componente de carga

const Home = () => {
    const [loading, setLoading] = useState(true); // Controla el estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        // Simula un tiempo de carga (por ejemplo, 2 segundos)
        const simulateLoading = setTimeout(() => {
            // Aquí podrías también verificar la sesión como lo hacías antes
            setLoading(false); // Cambia a falso después del tiempo simulado
        }, 2000); // 2 segundos de "carga ficticia"

        return () => clearTimeout(simulateLoading); // Limpiar timeout si el componente se desmonta
    }, []);

    if (loading) {
        return <Loading />; // Muestra la página de carga si está cargando
    }

    return (
        <div className="home-page">
            <NavBar />
            <div className="home-container">
                <h1>Tu salud es primero</h1>
            </div>
            <div className="card-wrap">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;
