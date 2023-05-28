import React from 'react';
import {useParams} from 'react-router-dom';
import "./css/User.css";

import Header from '../Components/Header';
import Footer from '../Components/Footer';

import users from './users.json';
import Cookies from 'js-cookie';

const User = ({}) => {

    var userId = 0;
    if (Cookies.get("userID")) {
        userId = Number(Cookies.get("userID"));
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

        <div className='userInfo'>
            <img className='avatar' src={"../img/chris.jpg"} />

            
            <div  className='usernome-box'>
                <p className='userdata' >Nome: {users[userId].name}</p>
                <p className='userdata'>Email: {users[userId].email}</p>
            </div>

            <p className='userdata bigtext'>Endereco: </p>
            <div  className='useraddress-box'>
                <label >Rua </label> 
                <input className='addressinput' type='text' defaultValue={endereco['rua']}></input>
                
                <label >Numero </label> 
                <input className='addressinput' type='text' defaultValue={endereco['numero']}></input>

                <br/>

                <label >Bairro </label> 
                <input className='addressinput' type='text' defaultValue={endereco['bairro']}></input>

                <label >Cep </label> 
                <input className='addressinput' type='text' defaultValue={endereco['cep']}></input>
            </div>

            <p className='userdata bigtext'>Alterar Senha: </p>
            <div className='userpassword-box'>
                <label >Senha atual </label> 
                <input className='addressinput' type='text'></input>

                <br/>
                
                <label >Nova senha </label> 
                <input className='addressinput' type='text'></input>

                <br/>

                <label >Cnofirme nova senha </label> 
                <input className='addressinput' type='text'></input>

                <br/>

                <button>Mudar senha</button>
            </div>
        </div>
        
        <Footer />
        </>
    );
};

export default User;