import React, { useState, useEffect } from "react";
import axios from "axios";
import "./verCita.css";
import NavBar from "../../../components/navbar";
import StatusBar from "../../../components/StatusBar";
import Loading from "../../../components/Loading"; // Asegúrate de tener este componente

const CitaVer = () => {
    const [appointmentId, setAppointmentId] = useState("");
    const [citaDetails, setCitaDetails] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");
    const [loading, setLoading] = useState(true); // Estado para controlar la carga ficticia inicial

    // Simulamos el tiempo de carga ficticia al cargar la página
    useEffect(() => {
        const simulateLoading = setTimeout(() => {
            setLoading(false); // Desactivar la pantalla de carga después del tiempo simulado
        }, 1500); // 2 segundos de "carga ficticia"

        return () => clearTimeout(simulateLoading); // Limpiar timeout si el componente se desmonta
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        const requestData = {
            objectName: "Cita",
            methodName: "Ver",
            params: { appointmentId: parseInt(appointmentId) },
        };

        axios
            .post("http://localhost:3000/toProcess", requestData, { withCredentials: true })
            .then((response) => {
                if (response.data && response.data.result) {
                    setCitaDetails(response.data.result);
                    setStatusMessage(response.data.result.msg);
                    setStatusType("success");
                } else {
                    setStatusMessage("No se encontró la cita con ese ID");
                    setStatusType("error");
                    setCitaDetails(null);
                }
            })
            .catch((error) => {
                setStatusMessage("Error al conectar con el servidor");
                setStatusType("error");
                setCitaDetails(null);
            });
    };

    const clearMessage = () => {
        setStatusMessage(""); // Limpia el mensaje después de 2 segundos
    };

    // Mostrar pantalla de carga si `loading` es verdadero
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="cita-ver-page">
            <NavBar />
            <StatusBar message={statusMessage} type={statusType} clearMessage={clearMessage} />
            <div className="cita-ver-container">
                <h2>Buscar Cita</h2>
                <form onSubmit={handleSearch}>
                    <input type="text" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} placeholder="ID de la Cita" required />
                    <button type="submit" className="btn-search">
                        Buscar
                    </button>
                </form>
                {citaDetails && (
                    <div>
                        <h3>Detalles de la Cita</h3>
                        <p>Fecha: {new Date(citaDetails.appointmentdate).toLocaleDateString()}</p>
                        <p>Hora: {citaDetails.appointmenttime}</p>
                        <p>
                            Paciente: {citaDetails.patientname} {citaDetails.patientlastname}
                        </p>
                        <p>
                            Doctor: {citaDetails.doctorname} {citaDetails.doctorlastname}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitaVer;
