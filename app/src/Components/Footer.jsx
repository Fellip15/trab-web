import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Footer.css"

const Footer = () => {
    // direciona o usuário para a página sobre nós
    const navigate = useNavigate();
    const aboutUsClick = () => {
        navigate('/about-us');
    }

    return (
        <footer>
            <button className="about-us-button" onClick={aboutUsClick}>Sobre nós</button>
            <div className="contacts">
                <h3>Contacts:</h3>
                <p>Tel: +55 31 3665-8484</p>
                <p>Email: contato@ovproperties.br</p>
            </div>
            <div className="font-inter-white made-with-love">
                feito com &lt;3
            </div>
        </footer>
    );
};

export default Footer;