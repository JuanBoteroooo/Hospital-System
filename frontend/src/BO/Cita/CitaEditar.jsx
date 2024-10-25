import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

const CitaEditar = () => {
    const [appointmentId, setAppointmentId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [personId, setPersonId] = useState("");
    const [employerId, setEmployerId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            objectName: "Cita",
            methodName: "Modificar",
            params: {
                appointmentId: parseInt(appointmentId),
                appointmentDate,
                appointmentTime,
                personId: parseInt(personId),
                EmployerId: parseInt(employerId),
            },
        };

        axiosInstance
            .post("http://localhost:3000/toProcess", requestData)
            .then((response) => {
                console.log("Cita modificada con éxito:", response.data);
            })
            .catch((error) => {
                console.error("Error al modificar cita:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Modificar Cita</h2>
            <input type="number" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} placeholder="ID de Cita" required />
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
            <input type="number" value={personId} onChange={(e) => setPersonId(e.target.value)} placeholder="ID de Persona" />
            <input type="number" value={employerId} onChange={(e) => setEmployerId(e.target.value)} placeholder="ID de Empleador" />
            <button type="submit">Modificar Cita</button>
        </form>
    );
};

export default CitaEditar;
