import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const CitaCrear = () => {
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [personId, setPersonId] = useState("");
    const [employerId, setEmployerId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificación de que personId y employerId no estén vacíos o inválidos
        if (!personId || !employerId) {
            console.error("ID de Persona o Empleador no puede estar vacío.");
            return;
        }

        const requestData = {
            objectName: "Cita",
            methodName: "Crear",
            params: {
                appointmentDate,
                appointmentTime,
                personId: parseInt(personId),
                EmployerId: parseInt(employerId),
            },
        };

        axiosInstance
            .post("http://localhost:3000/toProcess", requestData, { withCredentials: true })
            .then((response) => {
                console.log("Cita creada con éxito:", response.data);
            })
            .catch((error) => {
                console.error("Error al crear cita:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Crear Cita</h2>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
            <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
            <input type="number" value={personId} onChange={(e) => setPersonId(e.target.value)} placeholder="ID de Persona" required />
            <input type="number" value={employerId} onChange={(e) => setEmployerId(e.target.value)} placeholder="ID de Empleador" required />
            <button type="submit">Crear Cita</button>
        </form>
    );
};

export default CitaCrear;
