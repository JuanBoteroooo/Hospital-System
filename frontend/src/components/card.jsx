import React from "react";
import "./Card.css"; // Archivo CSS para los estilos de la tarjeta
import { Link } from "react-router-dom";

const Card = ({ title, description, link, imageUrl }) => {
    return (
        <div className="card-container">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={link} className="card-link">
                    Ver más
                </Link>
            </div>
        </div>
    );
};

export default Card;
