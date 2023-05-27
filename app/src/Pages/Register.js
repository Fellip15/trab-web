import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./css/Register.css"

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ErrorMess from '../Components/ErrorMess';

const Register = ({ dataUsers, addUser }) => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }

    // atribui os valores do input lido a cada variável referente
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
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClickRegister = () => {
        // analisa possíveis erros de cadastro
        const sameEmailUsers = dataUsers.filter(user =>
            user.email.toLowerCase() === inputEmail.toLowerCase()
        );
        
        if (
            inputName === '' || inputEmail === '' || 
            inputPassword === '' || inputConfirmPassword === ''
        ) {
            setHasError(true);
            setErrorMessage('Preencha todos os campos.');
        }

        else if (sameEmailUsers.length > 0) {
            setHasError(true);
            setErrorMessage('Email de usuário já cadastrado.');
            setInputEmail('');
        }

        else if (inputPassword !== inputConfirmPassword) {
            setHasError(true);
            setErrorMessage('As senhas escritas devem ser iguais.');
            setInputPassword('');
            setInputConfirmPassword('');
        }

        // se não possui erro, envia os dados do novo registro
        else {
            const newUser = {id: Math.random(), name: inputName, email: inputEmail, password: inputPassword};
            addUser(newUser);
            setHasError(false);
            alert('Faça login para confirmar o registro.');
            navigate('/login');
        }
    };

    return (
        <>
            <Header />

            <div className="register-frame content">
                <ErrorMess hidden={!hasError} message={errorMessage}/>

                <div className="form flex-col">
                    <h1 className="font-title-black title-register">Cadastre-se</h1>

                    <div className="input">
                        <label for="input-nome" className="nome font-inter-black">Nome:</label>
                        <input 
                            id="input-nome"
                            onChange={handleInputNameChange}
                            value={inputName}
                            type="text" 
                            className="input-text"
                        />
                    </div>
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
                    <div className="input">
                        <label for="input-confirmar-senha" className="confirmar-senha font-inter-black">Confirmar senha:</label>
                        <input 
                            id="input-confirmar-senha"
                            onChange={handleInputConfirmPasswordChange}
                            value={inputConfirmPassword}
                            type="password" 
                            className="input-text"
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