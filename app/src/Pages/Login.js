import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/Login.css"

import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = ({ dataUsers }) => {

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate(`/register`);
    }

    // atribui os valores do input a cada variável referente
    const [inputEmail, setInputEmail] = useState('');
    const handleInputEmailChange = (event) => {
        setInputEmail(event.target.value);
    };

    const [inputPassword, setInputPassword] = useState('');
    const handleInputPasswordChange = (event) => {
        setInputPassword(event.target.value);
    };

    // verifica o login nos dados e direciona à página do usuário
    const handleClickLogin = () => {
        // filtra os usuários no banco com email e senha lidos
        const targetUser = dataUsers.filter(user => 
            user.email.toLowerCase() === inputEmail.toLowerCase() &&
            user.password === inputPassword
        );
        
        // verifica se algum usuário possui email e senha definidos
        if (targetUser.lenght !== 1) {
            alert('Email ou senha inválidos');
        }
        else {
            
        }

        // reseta os valores de input
        setInputEmail('');
        setInputPassword('');
    };

    return (
        <>
            <Header />
            
            <div className="login-frame content">
                <div className="error-message error-message-hide">
                    <p className="error-message-text">
                        Possível mensagem de erro, errou a senha, usuário existente, apenas exemplos.
                    </p>
                </div>

                <div className="form flex-col">
                    <h1 className="font-title-black title-login">Login</h1>

                    <div className="input">
                        <label for="input-email" className="email font-inter-black">Email:</label>
                        <input 
                            id="input-email" 
                            onChange={handleInputEmailChange}
                            value={inputEmail}
                            type="text" 
                            className="input-text"
                        />
                    </div>
                    <div className="input">
                        <label for="input-senha" className="senha font-inter-black">Senha:</label>
                        <input 
                            id="input-senha"
                            onChange={handleInputPasswordChange}
                            value={inputPassword}
                            type="password" 
                            className="input-text"
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