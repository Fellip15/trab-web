import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BiHomeAlt2, BiCartAlt, BiUserCircle, BiLogOut, BiLogIn } from 'react-icons/bi'
import "./css/Header.css";
import { useCookies } from "react-cookie";

const Header = ({ adjustPath }) => {
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    if (adjustPath === undefined)
        adjustPath = '';

    // guarda o valor do que foi digitado no input na variável
    const [inputFind, setInputFind] = useState('');
    const handleInputChange = (e) => {
        setInputFind(e.target.value);
    };

    // busca ao ítem escrito no input
    const handleFindClick = () => {
        if (inputFind === '') return;

        navigate(`/search/${inputFind}`);
        setInputFind('');
    };

    // direciona o usuário para as páginas de cada click
    const navigate = useNavigate();
    const handleHomeClick   = () => { navigate('/') };
    const handleCartClick   = () => { navigate('/cart') };
    const handleUserClick   = () => { navigate('/user') };
    const handleLogOutClick = () => { removeCookies("user"); navigate('/'); }
    const handleLogin       = () => { navigate('/login') };

    const chooseIconUser = () => {
        if(cookies.user === undefined) {
            return (<div className="navbar-links" onClick={handleLogin}>
                        <BiLogIn className="icon"/>
                    </div>);
        }

        return (<>
                    <div className="navbar-links" onClick={handleUserClick}>
                        <BiUserCircle className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleLogOutClick}>
                        <BiLogOut className="icon"/>
                    </div>
                </>);
    }

    return (
        <header className="flex-row">
            <img src={adjustPath + "img/logo/logo.png"} alt="logo" className="logo"/>
            <div className="search-bar">
                <input
                    onChange={handleInputChange}
                    value={inputFind}
                    type="text" 
                    className="search-text"
                />
                <div className="search-loupe-div" onClick={handleFindClick}>
                    <FaSearch className="search-loupe"/>
                </div>
            </div>

            <div className="navbar">
                <div className="navbar-links" onClick={handleHomeClick}>
                    <BiHomeAlt2 className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleCartClick}>
                    <BiCartAlt className="icon"/>
                </div>
                {chooseIconUser()}
            </div>
        </header>
    );
};

export default Header;