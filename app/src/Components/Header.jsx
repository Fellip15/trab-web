import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Header.css";

const Header = () => {
    // guarda o valor do que foi digitado no input na variável
    const [inputFind, setInputFind] = useState('');
    const handleInputChange = (e) => {
        setInputFind(e.target.value);
    };

    // busca ao ítem escrito no input
    const handleFindClick = () => {
        if (inputFind === '') return;

        navigate(`/busca:${inputFind}`);
        setInputFind('');
    };

    // direciona o usuário para as páginas de cada click
    const navigate = useNavigate();
    const handleHomeClick = () => { navigate('/') };
    const handleCartClick = () => { navigate('/cart') };
    const handleUserClick = () => { navigate('/user') };

    return (
        <header className="flex-row">
            <img src="img/logo/logo.png" alt="logo" className="logo"/>
            <div className="search-bar">
                <input
                    onChange={handleInputChange}
                    value={inputFind}
                    type="text" 
                    className="search-text"
                />
                <div className="search-loupe-div" onClick={handleFindClick}>
                    <img src="/img/header/search-loupe.png" alt="search loupe" className="search-loupe"/>
                </div>
            </div>

            <div className="navbar">
                <div className="navbar-links" onClick={handleHomeClick}>
                    <img src="img/header/home.png" alt="home" className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleCartClick}>
                    <img src="img/header/shopping-cart.png" alt="shopping cart" className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleUserClick}>
                    <img src="img/header/user.png" alt="user" className="icon"/>
                </div>
            </div>
        </header>
    );
};

export default Header;