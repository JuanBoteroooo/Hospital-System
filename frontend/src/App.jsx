import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

function App() {
    return (
        <Router>
            <Routes>
                {/* La ruta "/" ahora redirige al Login */}
                <Route path="/" element={<Login />} /> {/* Login como página principal */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} /> {/* Ruta para Home */}
            </Routes>
        </Router>
    );
}

export default App;
