import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
            console.log("Logout successful:", response.data);
            navigate("/login"); // Redirige al usuario al login tras el logout
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="home-page">
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a href="/settings">Settings</a>
                    </li>
                    <li className="nav-item" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </nav>
            <div className="home-container">
                <h1>Welcome to the Home Page</h1>
                <p>This is the main dashboard after logging in or registering.</p>
            </div>
        </div>
    );
};

export default Home;
