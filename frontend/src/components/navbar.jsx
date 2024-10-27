import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Estilo CSS separado
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
            console.log("Logout successful:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>CCardioz</h1>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/about">Acerca de</Link>
                </li>
                <li>
                    <Link to="/services">Servicios</Link>
                </li>
                <li>
                    <Link to="/contact">Contacto</Link>
                </li>
                <li>
                    {/* Botón de logout */}
                    <button className="logout-btn" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
