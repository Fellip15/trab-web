import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/Register.css"

import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = ({ dataUsers }) => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate(`/login`);
    }

    return (
        <>
            <Header />

            <div className="register-frame content">
                <div className="error-message error-message-hide">
                    <p className="error-message-text">
                        Possível mensagem de erro, errou a senha, usuário existente, apenas exemplos.
                    </p>
                </div>

                <div className="form flex-col">
                    <h1 className="font-title-black title-register">Cadastre-se</h1>

                    <div className="input">
                        <label for="input-nome" className="nome font-inter-black">Nome:</label>
                        <input id="input-nome" type="text" className="input-text"/>
                    </div>
                    <div className="input">
                        <label for="input-email" className="email font-inter-black">Email:</label>
                        <input id="input-email" type="text" className="input-text"/>
                    </div>
                    <div className="input">
                        <label for="input-senha" className="senha font-inter-black">Senha:</label>
                        <input id="input-senha" type="password" className="input-text"/>
                    </div>
                    <div className="input">
                        <label for="input-confirmar-senha" className="confirmar-senha font-inter-black">Confirmar senha:</label>
                        <input id="input-confirmar-senha" type="password" className="input-text"/>
                    </div>
                    <input type="button" name="button" className="botao" value="Confirmar"/>
                    <div id="with-register" onClick={handleLogin}>Já possui cadastro?</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;