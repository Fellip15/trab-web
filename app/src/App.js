import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './Pages/Home';
import User from './Pages/User';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Search from './Pages/Search';
import ItemDescr from './Pages/ItemDescr';
import AboutUs from './Pages/AboutUs';
import Adm from './Pages/Adm';

import orgUsersInfo from './data/users.json';
import orgItensInfo from './data/itens.json'; 
import EditItem from './Pages/EditItem';


// define as rotas da aplicação para cada componente
const App = () => {


    // lê o json das informações da aplicação e atribui à variáveis
    const [itensInfo, setItensInfo] = useState(orgItensInfo['array']);
    const [usersInfo, setUsersInfo] = useState(orgUsersInfo);

    console.log("Start: ", itensInfo)

    // adiciona um novo usuário no banco (!!!!!o post ta dando status 404)
    const addUser = (newUser) => {
        // atualiza a lista de usuários
        usersInfo.append(newUser);
        setUsersInfo(usersInfo);
    };

    // remove o ítem indicado no banco (!!!!!o post ta dando status 404)
    const remItem = (itemId) => {
        // atualiza os dados da var
        const newItensInfo = itensInfo.filter(item => item.id !== itemId);
        setItensInfo(newItensInfo);
    };

    // tratar em toda página que utilizar os dados .json para renderizar apenas se for !== undefined, pois o fetch é assíncrono
    return (
        <Router>
            <Routes>
                {/* Rotas de usuário comum */}
                <Route path="/" exact element={<Home dataItens={itensInfo}/>}/>
                <Route path="/home" exact element={<Home dataItens={itensInfo}/>}/>
                <Route path="/user" exact element={<User dataItens={itensInfo}/>}/>
                <Route path="/login" exact element={<Login dataUsers={usersInfo}/>}/>
                <Route path="/register" exact element={<Register dataUsers={usersInfo} addUser={addUser}/>}/>
                <Route path="/search/:itemName" exact element={<Search dataItens={itensInfo}/>}/>
                <Route path="/item/:itemId" exact element={<ItemDescr dataItens={itensInfo}/>}/>
                <Route path="/about-us" exact element={<AboutUs />}/>

                {/* Rotas de administradores */}
                <Route path="/adm" exact element={<Adm dataItens={itensInfo} setItems={setItensInfo} remItem={remItem} />}/>
                <Route path="/adm/edit/:itemId" exact element={<EditItem dataItens={itensInfo} setItems={setItensInfo}/>}/>
            </Routes>
        </Router>
    );
};

export default App;