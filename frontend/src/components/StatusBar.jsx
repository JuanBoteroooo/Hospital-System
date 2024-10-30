import React, { useEffect } from "react";
import "./StatusBar.css"; // Asegúrate de que el archivo de estilos esté correctamente vinculado

const StatusBar = ({ message, type, clearMessage }) => {
    useEffect(() => {
        if (message) {
            // Ocultar el mensaje después de 2 segundos
            const timer = setTimeout(() => {
                clearMessage(); // Llama a la función para limpiar el mensaje
            }, 3000); // 2000 ms = 2 segundos

            return () => clearTimeout(timer); // Limpiamos el temporizador si se desmonta el componente
        }
    }, [message, clearMessage]);

    if (!message) return null; // Si no hay mensaje, no mostramos nada

    return (
        <div className={`status-bar ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default StatusBar;
