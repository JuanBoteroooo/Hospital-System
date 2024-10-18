import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta para login */}
                <Route path="/login" element={<Login />} />

                {/* Ruta para registro */}
                <Route path="/register" element={<Register />} />

                {/* Ruta para home */}
                <Route path="/home" element={<Home />} />

                {/* Redirigir la ruta raíz al login */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
