import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import VerCita from "./BO/Cita/Ver/verCita";
import "./app.css";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta para login */}
                <Route path="/login" element={<Login />} />

                <Route path="/verCita" element={<VerCita />} />

                {/* Ruta para registro */}
                <Route path="/register" element={<Register />} />

                {/* Ruta para home */}
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
