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