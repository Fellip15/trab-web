import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';

import { baseURL } from "../../config";

import "./Register.css"

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Message from '../../Components/Message';
import { toast } from 'react-toastify';

const Register = ({ dataUsers, addUser }) => {
    const locate = useLocation();
    useEffect(() => {
        if(locate.state && locate.state.successMessage) {
            toast.success(locate.state.successMessage);
        }
        if(locate.state && locate.state.errorMessage) {
            toast.error(locate.state.errorMessage);
        }
    }, [locate])

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    // atribui os valores do input lido a cada variável referente
    const [inputUser, setInputUser] = useState('');
    const handleInputUserChange = (event) => {
        setInputUser(event.target.value);
    };

    const [inputName, setInputName] = useState('');
    const handleInputNameChange = (event) => {
        setInputName(event.target.value);
    };

    const [inputEmail, setInputEmail] = useState('');
    const handleInputEmailChange = (event) => {
        setInputEmail(event.target.value);
    };

    const [inputPassword, setInputPassword] = useState('');
    const handleInputPasswordChange = (event) => {
        setInputPassword(event.target.value);
    };

    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const handleInputConfirmPasswordChange = (event) => {
        setInputConfirmPassword(event.target.value);
    };

    // verifica os dados de cadastro e finaliza
    const handleClickRegister = () => {
        const url = baseURL + "/users";
        console.log("Fazendo a requisição para" + url);
        // requisicao pro backend
        axios.post(url, {
            userName: inputUser,
            name: inputName,
            email:inputEmail,
            password: inputPassword,
            confirmPassword: inputConfirmPassword
        })
        .then((res) => {
            console.log(res);
            navigate("/login", { state: { successMessage: res.data.message } });
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        });
    };

    const listenerKeyEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleClickRegister();
        }
    }

    return (
        <>
            <Message />
            <Header />

            <div className="register-frame content">
                <div className="form flex-col">
                    <h1 className="font-title-black title-register">Cadastre-se</h1>

                    <div className="input">
                        <label htmlFor="input-user" className="nome font-inter-black">Usuário:</label>
                        <input 
                            id="input-user"
                            onChange={handleInputUserChange}
                            value={inputUser}
                            type="text" 
                            className="input-text"
                            onKeyDown={(e) => listenerKeyEnter(e)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="input-nome" className="nome font-inter-black">Nome:</label>
                        <input 
                            id="input-nome"
                            onChange={handleInputNameChange}
                            value={inputName}
                            type="text" 
                            className="input-text"
                            onKeyDown={(e) => listenerKeyEnter(e)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="input-email" className="email font-inter-black">Email:</label>
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
                    <div className="input">
                        <label htmlFor="input-confirmar-senha" className="confirmar-senha font-inter-black">Confirmar senha:</label>
                        <input 
                            id="input-confirmar-senha"
                            onChange={handleInputConfirmPasswordChange}
                            value={inputConfirmPassword}
                            type="password" 
                            className="input-text"
                            onKeyDown={(e) => listenerKeyEnter(e)}
                        />
                    </div>
                    <input 
                        type="button"
                        onClick={handleClickRegister} 
                        name="button" 
                        className="botao" 
                        value="Confirmar"
                    />
                    <div id="with-register" onClick={handleLogin}>Já possui cadastro?</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Register;