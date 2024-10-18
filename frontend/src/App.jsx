import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Asegúrate de importar Routes en lugar de Switch
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"; // Si tienes un componente Home

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Ruta para Home */}
                <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
                <Route path="/register" element={<Register />} /> {/* Ruta para Register */}
            </Routes>
        </Router>
    );
}

export default App;
