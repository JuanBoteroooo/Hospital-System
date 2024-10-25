import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const CitaVer = () => {
    const [appointmentId, setAppointmentId] = useState("");
    const [citaDetails, setCitaDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();

        const requestData = {
            objectName: "Cita",
            methodName: "Ver",
            params: {
                appointmentId: parseInt(appointmentId),
            },
        };

        axiosInstance
            .post("http://localhost:3000/toProcess", requestData, { withCredentials: true })
            .then((response) => {
                console.log("Respuesta del servidor:", response.data.result);

                // Si hay resultados en response.data.result, cargamos los detalles
                if (response.data && response.data.result) {
                    setCitaDetails(response.data.result);
                    setError(null);
                } else {
                    setError("No se encontró la cita.");
                    setCitaDetails(null);
                }
            })
            .catch((error) => {
                console.error("Error al obtener la cita:", error);
                setError("Error al obtener la cita.");
                setCitaDetails(null);
            });
    };

    return (
        <div>
            <h2>Ver Cita</h2>
            <form onSubmit={handleSearch}>
                <input type="text" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} placeholder="ID de la Cita" required />
                <button type="submit">Buscar Cita</button>
            </form>

            {/* Mostrar error si existe */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Mostrar los detalles de la cita si están disponibles */}
            {citaDetails && (
                <div>
                    <h3>Detalles de la Cita</h3>
                    <p>Fecha: {new Date(citaDetails.appointment_dt).toLocaleDateString() || "Fecha no válida"}</p>
                    <p>Hora: {citaDetails.appointment_hr || "Hora no disponible"}</p>
                    <p>ID Persona: {citaDetails.person_id || "ID no disponible"}</p>
                    <p>ID Empleador: {citaDetails.employer_id || "ID no disponible"}</p>
                    <p>ID Departamento: {citaDetails.department_id || "ID no disponible"}</p>
                </div>
            )}
        </div>
    );
};

export default CitaVer;
