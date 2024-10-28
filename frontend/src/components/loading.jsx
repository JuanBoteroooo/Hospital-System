import React from "react";
import "./loading.css"; // Asegúrate de agregar tu archivo CSS
import corazon from "../assets/images/corazon.png"; // Importa la imagen de carga

const HeartLoader = () => {
    return (
        <div className="loading-container">
            {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" xmlSpace="preserve" className="heart-svg">
                <path fill="#3e5b97" d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09 C13.09,3.81,14.76,3,16.5,3C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z" />
            </svg> */}
            <img src={corazon} alt="cora" className="heart-svg" />
        </div>
    );
};

export default HeartLoader;
