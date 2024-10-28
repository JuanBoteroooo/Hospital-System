import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axiosInstance from "../axiosConfig";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Previene la recarga de la página
        try {
            const response = await axiosInstance.post("http://localhost:3000/register", formData);
            console.log("Register response:", response);
            if (response.status === 200) {
                navigate("/login"); // Navega a la página de login después de un registro exitoso
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="container-center">
                    <h1>Welcome! Create an Account</h1>
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                            <label htmlFor="name">First Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="First Name" required />
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                        </div>
                        <button type="submit" className="register-btn">
                            Create Account
                        </button>
                    </form>
                    <a href="/login" className="back-to-login">
                        Back to login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Register;
