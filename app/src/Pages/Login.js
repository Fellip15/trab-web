import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/Login.css"

import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate(`/register`);
    }

    return (
        <>
            <Header />

            <div class="login-frame content">
                <div class="error-message error-message-hide">
                    <p class="error-message-text">
                        Possível mensagem de erro, errou a senha, usuário existente, apenas exemplos.
                    </p>
                </div>

                <div class="form flex-col">
                    <h1 class="font-title-black title-login">Login</h1>

                    <div class="input">
                        <label for="input-email" class="email font-inter-black">Email:</label>
                        <input id="input-email" type="text" class="input-text"/>
                    </div>
                    <div class="input">
                        <label for="input-senha" class="senha font-inter-black">Senha:</label>
                        <input id="input-senha" type="password" class="input-text"/>
                    </div>
                    <input type="button" name="button" class="botao" value="Confirmar"/>
                    <div id="without-register" onClick={handleRegister}>Ainda não possui cadastro?</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;