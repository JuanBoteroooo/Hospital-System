import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../components/navbar";
import Loading from "../components/loading"; // Importa el componente de carga
import f1 from "../assets/images/agendar.jpg";
import f2 from "../assets/images/hospitalizacion.jpg";
import f3 from "../assets/images/tratamiento.jpg";
import f4 from "../assets/images/historia.jpg";
import f5 from "../assets/images/examen.jpg";

const Home = () => {
    const [loading, setLoading] = useState(true); // Controla el estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        // Simula un tiempo de carga (por ejemplo, 2 segundos)
        const simulateLoading = setTimeout(() => {
            // Aquí podrías también verificar la sesión como lo hacías antes
            setLoading(false); // Cambia a falso después del tiempo simulado
        }, 3000); // 2 segundos de "carga ficticia"

        return () => clearTimeout(simulateLoading); // Limpiar timeout si el componente se desmonta
    }, []);

    if (loading) {
        return <Loading />; // Muestra la página de carga si está cargando
    }

    return (
        <div className="home-page">
            <div className="header">
                <NavBar />
            </div>
            <div className="home-container">
                <h1>Tu salud es primero</h1>
            </div>
            <div className="img-carousel">
                <div className="linewhite"></div>
                <section>
                    <div>
                        <img src={f1} alt="Agendar" />
                        <label>Citas</label>
                    </div>
                    <div>
                        <img src={f4} alt="Historia clínica" />
                        <label>Historia clínica</label>
                    </div>
                    <div>
                        <img src={f5} alt="Exámenes" />
                        <label>Exámenes</label>
                    </div>
                    <div>
                        <img src={f3} alt="Tratamiento" />
                        <label>Tratamiento</label>
                    </div>
                    <div>
                        <img src={f2} alt="Hospitalización" />
                        <label>Hospitalización</label>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
