import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { BiHomeAlt2, BiCartAlt, BiUserCircle, BiUserPlus, BiLogOut, BiLogIn, BiCheckboxChecked, BiUserMinus } from 'react-icons/bi'
import "./Header.css";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';
import axios from "axios";
import { baseURL } from "../../config";

const Header = () => {
    const [cookies, setCookies, removeCookies] = useCookies(["user", "admin"]);

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        async function redirectAdmin() {
            if(cookies.user === undefined) {
                setIsAdmin(false);
                return;
            } 
            const res = await axios.get(baseURL + "/isAdmin/" + cookies.user);
            console.log(res.data.isAdmin)
            let isAdminVariable = res.data.isAdmin || false; 
            setIsAdmin(isAdminVariable);
        }
        redirectAdmin();
    }, []);

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
    const location = useLocation();
    const handleHomeClick   = () => { navigate('/') };
    const handleHomeAdmClick   = () => { navigate('/adm') };
    const handleCreateAdmClick   = () => { navigate('/adm/create') };
    const handleDeleteUserClick   = () => { navigate('/userdelete') };
    const handleCartClick   = () => { navigate('/cart') };
    const handleUserClick   = () => { navigate('/user') };
    const handleLogOutClick = () => {
        removeCookies("user");

        // direciona para a home com a mensagem de logout
        if (location.pathname === '/')
            toast.success('Usuário deslogado');
        else
            navigate('/', {state: {logoutMessage: 'Usuário deslogado'}});
    }
    const handleLogin       = () => { navigate('/login') };
    const handleAddAdmClick = () => { navigate('/register'); alert('add os cookies do adm!!!!!!'); };

    const chooseIconUser = () => {
        // se não está logado
        if(cookies.user === undefined) {
            return (
                <>
                    <div className="navbar-links" onClick={handleHomeClick}>
                        <BiHomeAlt2 className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleCartClick}>
                        <BiCartAlt className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleLogin}>
                        <BiLogIn className="icon"/>
                    </div>
                </>
            );
        }

        // se é adm logado !!!!!!!!! tratar isso
        else if (isAdmin) {
            return (
                <>
                    <div className="navbar-links" onClick={handleHomeAdmClick}>
                        <BiHomeAlt2 className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleDeleteUserClick}>
                        <BiUserMinus className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleCreateAdmClick}>
                        <BiUserPlus className="icon"/>
                    </div>
                    <div className="navbar-links" onClick={handleLogOutClick}>
                        <BiLogOut className="icon"/>
                    </div>
                </>
            );
        }

        // se é usuário logado
        return (
            <>
                <div className="navbar-links" onClick={handleHomeClick}>
                    <BiHomeAlt2 className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleCartClick}>
                    <BiCartAlt className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleUserClick}>
                    <BiUserCircle className="icon"/>
                </div>
                <div className="navbar-links" onClick={handleLogOutClick}>
                    <BiLogOut className="icon"/>
                </div>
            </>
        );
    }

    return (
        <header className="flex-row">
            <img src={"/img/logo/logo.png"} alt="logo" className="logo"/>
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
            { isAdmin !== undefined &&
                    chooseIconUser()
            }
            </div>
        </header>
    );
};

export default Header;