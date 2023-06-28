import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

import axios from "axios";
import { baseURL } from "../../config";

import "./Login.css"

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Message from '../../Components/Message';

const Login = () => {
    const locate = useLocation();
    useEffect(() => {
        if(locate.state && locate.state.successMessage) {
            toast.success(locate.state.successMessage);
        }
        if(locate.state && locate.state.errorMessage) {
            toast.error(locate.state.errorMessage);
        }
    }, [locate])

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register');
    }

    // ainda é preciso tratar o que fazer com o id de usuário
    const handleLoginFinished = (user) => {
        setCookies("user", `${user.id}`);
        if(Number(user.admin) === 1)
            setCookies("admin", `1`);
        navigate('/');
    }

    // atribui os valores do input lido a cada variável referente
    const [inputEmail, setInputEmail] = useState('');
    const handleInputEmailChange = (event) => {
        setInputEmail(event.target.value);
    };

    const [inputPassword, setInputPassword] = useState('');
    const handleInputPasswordChange = (event) => {
        setInputPassword(event.target.value);
    };

    // verifica o login nos dados e direciona à página do usuário
    const isFilled = (input) => {
        if(input === undefined || input.length === 0)
            return false;

        return true;
    };
    const [message, setMessage] = useState(undefined);
    const [isMessageError, setIsMessageError] = useState(false);
    const handleClickLogin = () => {
        axios.post(baseURL + "/users/login", {
            userName: inputEmail,
            password: inputPassword
        })
        .then((res) => {
            console.log(res);
            setCookies("user", res.data.token);
            navigate("/", { state: { successMessage: "Login efetuado com sucesso!" } });
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message)
        });
    };

    const listenerKeyEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleClickLogin();
        }
    }

    return (
        <>
            <Message />
            <Header />
            
            <div className="login-frame content">
                <div className="form flex-col">
                    <h1 className="font-title-black title-login">Login</h1>

                    <div className="input">
                        <label htmlFor="input-email" className="email font-inter-black">Email ou User:</label>
                        <input 
                            id="input-email" 
                            onChange={handleInputEmailChange}
                            value={inputEmail}
                            type="email" 
                            className="input-text"
                            onKeyDown={(e) => listenerKeyEnter(e)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="input-senha" className="senha font-inter-black">Senha:</label>
                        <input 
                            id="input-senha"
                            onChange={handleInputPasswordChange}
                            value={inputPassword}
                            type="password" 
                            className="input-text"
                            onKeyDown={(e) => listenerKeyEnter(e)}
                        />
                    </div>
                    <input 
                        type="button"
                        onClick={handleClickLogin}
                        name="button" 
                        className="botao" 
                        value="Confirmar"
                    />
                    <div id="without-register" onClick={handleRegister}>Ainda não possui cadastro?</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;