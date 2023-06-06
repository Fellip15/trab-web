import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Register.css"

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ErrorMess from '../../Components/ErrorMess';

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
    const [errorMessage, setErrorMessage] = useState(undefined);
    const handleClickRegister = () => {
        // analisa possíveis erros de cadastro
        const sameEmailUsers = dataUsers.filter(user =>
            user.email.toLowerCase() === inputEmail.toLowerCase()
        );
        
        if (
            inputName === '' || inputEmail === '' || 
            inputPassword === '' || inputConfirmPassword === ''
        ) {
            setErrorMessage('Preencha todos os campos.');
        }

        else if (sameEmailUsers.length > 0) {
            setErrorMessage('Email de usuário já cadastrado.');
            setInputEmail('');
        }

        else if (inputPassword !== inputConfirmPassword) {
            setErrorMessage('As senhas escritas devem ser iguais.');
            setInputPassword('');
            setInputConfirmPassword('');
        }

        // se não possui erro, envia os dados do novo registro
        else {
            const newUser = {id: Math.random(), name: inputName, email: inputEmail, password: inputPassword};
            addUser(newUser);
            setErrorMessage(undefined);
            alert('Faça login para confirmar o registro.');
            navigate('/login');
        }
    };

    const listenerKeyEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleClickRegister();
        }
    }

    return (
        <>
            <Header />

            <div className="register-frame content fixed-screen">
                {errorMessage !== undefined && <ErrorMess message={errorMessage}/>}

                <div className="form flex-col">
                    <h1 className="font-title-black title-register">Cadastre-se</h1>

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
                            type="text" 
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