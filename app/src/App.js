import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AboutUs from './Pages/AboutUs';

// define as rotas da aplicação para cada componente
const App = () => {
    // lê o json das informações da aplicação e atribui à variáveis
    const [itensInfo, setItensInfo] = useState(undefined);
    const [usersInfo, setUsersInfo] = useState(undefined);
    async function getData() {
        // dados dos ítens
        fetch('./data/itens.json')
            .then(data => data.json())
            .then(jsonData => setItensInfo(jsonData.array));

        // dados dos usuários
        fetch('./data/users.json')
            .then(data => data.json())
            .then(jsonData => setUsersInfo(jsonData.array));
    }
    useEffect(() => {
        getData();
    }, []);

    // função de adicionar um usuário no banco (!!!!!!!!!!!!ainda terminar ela)
    const addUser = (newUser) => {
        console.log(newUser);
    };

    // tratar em toda página que utilizar os dados .json para renderizar apenas se for !== undefined, pois o fetch é assíncrono
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home dataItens={itensInfo}/>}/>
                <Route path="/home" element={<Home dataItens={itensInfo}/>}/>
                <Route path="/login" element={<Login dataUsers={usersInfo}/>}/>
                <Route path="/register" element={<Register dataUsers={usersInfo} addUser={addUser}/>}/>
                <Route path="/about-us" exact element={<AboutUs />}/>
            </Routes>
        </Router>
    );
};

export default App;