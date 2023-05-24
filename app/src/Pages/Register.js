import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/Register.css"

import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate(`/login`);
    }

    return (
        <>
            <Header />

            <div class="register-frame content">
                <div class="error-message error-message-hide">
                    <p class="error-message-text">
                        Possível mensagem de erro, errou a senha, usuário existente, apenas exemplos.
                    </p>
                </div>

                <div class="form flex-col">
                    <h1 class="font-title-black title-register">Cadastre-se</h1>

                    <div class="input">
                        <label for="input-nome" class="nome font-inter-black">Nome:</label>
                        <input id="input-nome" type="text" class="input-text"/>
                    </div>
                    <div class="input">
                        <label for="input-email" class="email font-inter-black">Email:</label>
                        <input id="input-email" type="text" class="input-text"/>
                    </div>
                    <div class="input">
                        <label for="input-senha" class="senha font-inter-black">Senha:</label>
                        <input id="input-senha" type="password" class="input-text"/>
                    </div>
                    <div class="input">
                        <label for="input-confirmar-senha" class="confirmar-senha font-inter-black">Confirmar senha:</label>
                        <input id="input-confirmar-senha" type="password" class="input-text"/>
                    </div>
                    <input type="button" name="button" class="botao" value="Confirmar"/>
                    <div id="with-register" onClick={handleLogin}>Já possui cadastro?</div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;