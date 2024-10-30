import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import NavBar from "../components/navbar";
import Loading from "../components/loading";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [showCrud, setShowCrud] = useState({
        cita: false,
        historia: false,
        examenes: false,
        tratamiento: false,
        hospitalizacion: false,
    });
    const [timeoutId, setTimeoutId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get("http://localhost:3000/sessionExist", { withCredentials: true });
                if (!response.data.session) {
                    navigate("/login");
                } else {
                    setSessionLoading(false);
                }
            } catch (error) {
                console.error("Error verificando la sesión:", error);
                navigate("/login");
            }
        };

        checkSession();
    }, [navigate]);

    useEffect(() => {
        if (!sessionLoading) {
            const simulateLoading = setTimeout(() => {
                setLoading(false);
            }, 2000);

            return () => clearTimeout(simulateLoading);
        }
    }, [sessionLoading]);

    const handleClick = (section) => {
        setShowCrud((prev) => ({
            ...prev,
            [section]: true,
        }));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const id = setTimeout(() => {
            setShowCrud((prev) => ({
                ...prev,
                [section]: false,
            }));
        }, 3500);

        setTimeoutId(id);
    };

    const handleOption = (section, option) => {
        switch (option) {
            case "Agendar":
                navigate(`/crear${section}`);
                break;
            case "Modifica":
                navigate(`/modificar${section}`);
                break;
            case "Cancela":
                navigate(`/eliminar${section}`);
                break;
            case "Consulta":
                navigate(`/ver${section}`);
                break;
            default:
                break;
        }
    };

    if (sessionLoading || loading) {
        return <Loading />;
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
                    {/* Sección Cita */}
                    <div className="cita" onClick={() => handleClick("cita")}>
                        <div className="labelwrapper">
                            {!showCrud.cita && (
                                <div className="labelP">
                                    <label>Cita</label>
                                </div>
                            )}
                            {showCrud.cita && (
                                <div className="labelL">
                                    <label onClick={() => handleOption("Cita", "Agendar")}>Agendar</label>
                                    <label onClick={() => handleOption("Cita", "Modifica")}>Modificar</label>
                                    <label onClick={() => handleOption("Cita", "Cancela")}>Cancelar</label>
                                    <label onClick={() => handleOption("Cita", "Consulta")}>Consultar</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección Historia Clínica */}
                    <div className="historia" onClick={() => handleClick("historia")}>
                        <div className="labelwrapper">
                            {!showCrud.historia && (
                                <div className="labelP">
                                    <label>Historia Clínica</label>
                                </div>
                            )}
                            {showCrud.historia && (
                                <div className="labelL">
                                    <label onClick={() => handleOption("historia", "Agendar")}>Agendar</label>
                                    <label onClick={() => handleOption("historia", "Modifica")}>Modificar</label>
                                    <label onClick={() => handleOption("historia", "Cancela")}>Cancelar</label>
                                    <label onClick={() => handleOption("historia", "Consulta")}>Consultar</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección Exámenes */}
                    <div className="examenes" onClick={() => handleClick("examenes")}>
                        <div className="labelwrapper">
                            {!showCrud.examenes && (
                                <div className="labelP">
                                    <label>Exámenes</label>
                                </div>
                            )}
                            {showCrud.examenes && (
                                <div className="labelL">
                                    <label onClick={() => handleOption("examenes", "Agendar")}>Agendar</label>
                                    <label onClick={() => handleOption("examenes", "Modifica")}>Modificar</label>
                                    <label onClick={() => handleOption("examenes", "Cancela")}>Cancelar</label>
                                    <label onClick={() => handleOption("examenes", "Consulta")}>Consultar</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección Tratamiento */}
                    <div className="tratamiento" onClick={() => handleClick("tratamiento")}>
                        <div className="labelwrapper">
                            {!showCrud.tratamiento && (
                                <div className="labelP">
                                    <label>Tratamiento</label>
                                </div>
                            )}
                            {showCrud.tratamiento && (
                                <div className="labelL">
                                    <label onClick={() => handleOption("tratamiento", "Agendar")}>Agendar</label>
                                    <label onClick={() => handleOption("tratamiento", "Modifica")}>Modificar</label>
                                    <label onClick={() => handleOption("tratamiento", "Cancela")}>Cancelar</label>
                                    <label onClick={() => handleOption("tratamiento", "Consulta")}>Consultar</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sección Hospitalización */}
                    <div className="hospitalizacion" onClick={() => handleClick("hospitalizacion")}>
                        <div className="labelwrapper">
                            {!showCrud.hospitalizacion && (
                                <div className="labelP">
                                    <label>Hospitalización</label>
                                </div>
                            )}
                            {showCrud.hospitalizacion && (
                                <div className="labelL">
                                    <label onClick={() => handleOption("hospitalizacion", "Agendar")}>Agendar</label>
                                    <label onClick={() => handleOption("hospitalizacion", "Modifica")}>Modificar</label>
                                    <label onClick={() => handleOption("hospitalizacion", "Cancela")}>Cancelar</label>
                                    <label onClick={() => handleOption("hospitalizacion", "Consulta")}>Consultar</label>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
