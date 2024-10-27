import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../components/navbar";
import Card from "../components/card";

const Home = () => {
    return (
        <div className="home-page">
            <NavBar></NavBar>
            <div className="home-container">
                <h1>Tu salud es primero</h1>
            </div>
            <div className="card-wrap">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    );
};

export default Home;
