import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const CitaEliminar = () => {
    const [appointmentId, setAppointmentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            objectName: "Cita",
            methodName: "Eliminar",
            params: {
                appointmentId: parseInt(appointmentId),
            },
        };

        axiosInstance
            .post("http://localhost:3000/toProcess", requestData)
            .then((response) => {
                console.log("Cita eliminada con éxito:", response.data);
            })
            .catch((error) => {
                console.error("Error al eliminar cita:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Eliminar Cita</h2>
            <input type="number" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} placeholder="ID de Cita" required />
            <button type="submit">Eliminar Cita</button>
        </form>
    );
};

export default CitaEliminar;
