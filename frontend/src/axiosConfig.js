// src/axiosConfig.js
import axios from 'axios';

// Crea una instancia de axios con withCredentials habilitado
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // La URL base de tu servidor backend
  withCredentials: true,  // Habilita el envío de cookies con las solicitudes
});

export default axiosInstance;
