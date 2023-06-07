import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import "./User.css";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import users from '../../data/users.json';
import { useCookies } from 'react-cookie';

const User = ({}) => {
    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    var userId = 0;
    if (cookies.user) {
        userId = Number(cookies.user);
    } else {
        navigate("/");
    }

    // TODO: get address from database
    const endereco = {
        "rua":"Rua ficticia",
        "bairro":"Bairro que nao existe",
        "numero":"-1",
        "cep":"11111111"
    };

    return (
        <>
        <Header adjustPath={'../'}/>

        <div className='userInfo content'>
            <img className='avatar' src={"../img/chris.jpg"} />

            <div className='group-box'>
                <p className='bigtext'>Nome: {users[userId].name}</p>
                <p className='bigtext'>Email: {users[userId].email}</p>
            </div>

            <div className='group-box'>
                <h2>Endereco:</h2>
                <div className='street-line'>
                    <label>Rua:</label> 
                    <input className='user-input' type='text' defaultValue={endereco['rua']}></input>
                    <label>Numero:</label> 
                    <input className='user-input' type='text' defaultValue={endereco['numero']}></input>
                </div>

                <div className='street-line'>
                    <label>Bairro:</label> 
                    <input className='user-input' type='text' defaultValue={endereco['bairro']}></input>
                    <label>Cep:</label> 
                    <input className='user-input' type='text' defaultValue={endereco['cep']}></input>
                </div>
            </div>

            <div className='group-box'>
                <h2>Alterar Senha:</h2>
                <div className='street-line'>
                    <label>Senha atual:</label> 
                    <input className='user-input password-input' type='password'></input>
                </div>
                <div className='street-line'>
                    <label>Nova senha:</label> 
                    <input className='user-input password-input' type='password'></input>
                </div>
                <div className='street-line'>
                    <label>Cnofirme nova senha:</label> 
                    <input className='user-input' type='password'></input>
                </div>
                <button className='button-user'>Mudar senha</button>
            </div>
        </div>
        
        <Footer />
        </>
    );
};

export default User;