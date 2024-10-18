import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import "./Register.css";
import imagen4 from "../assets/images/imagen4.jpg"; // Asegúrate de que la ruta sea correcta

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <div className="page-container">
            {/* Sección izquierda con decoraciones e imagen */}
            <div className="left-section">
                <img src={imagen4} alt="Decorative" className="single-image" />
            </div>

            {/* Sección derecha para el formulario */}
            <div className="right-section">
                <div className="form-container">
                    <h1>Register</h1>
                    <div className="input-scroll">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Phone</label>
                                <input type="text" name="phone" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" name="email" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Address</label>
                                <input type="text" name="address" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Username</label>
                                <input type="text" name="username" onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input type="password" name="password" onChange={handleChange} />
                            </div>
                        </form>
                    </div>

                    {/* Botón de registro */}
                    <button type="submit" className="submit-btn">
                        Register
                    </button>

                    {/* Enlace para volver a la página de login */}
                    <Link to="/login" className="back-to-login">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
