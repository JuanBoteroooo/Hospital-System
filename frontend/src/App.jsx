import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import CitaCrear from "./BO/Cita/CitaCrear";
import CitaVer from "./BO/Cita/CitaVer";
import CitaEditar from "./BO/Cita/CitaEditar";
import CitaEliminar from "./BO/Cita/CitaEliminar";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta para login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para registro */}
                <Route path="/register" element={<Register />} />

                {/* Ruta para home */}
                <Route path="/" element={<Home />} />

                <Route path="/crear-cita" element={<CitaCrear />} />
                <Route path="/ver-cita" element={<CitaVer />} />
                <Route path="/modificar-cita" element={<CitaEditar />} />
                <Route path="/eliminar-cita" element={<CitaEliminar />} />
            </Routes>
        </Router>
    );
}

export default App;
