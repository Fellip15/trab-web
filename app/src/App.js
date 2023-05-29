import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";

import Home from './Pages/Home';
// import User from './Pages/User';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Search from './Pages/Search';
import ItemDescr from './Pages/ItemDescr';
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

    // adiciona um novo usuário no banco (!!!!!o post ta dando status 404)
    const addUser = (newUser) => {
        // atualiza a lista de usuários
        let newUsersInfo = usersInfo
        newUsersInfo.push({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        });

        // manda os novos dados no banco
        setUsersInfo(newUsersInfo);
        fetch('./data/users.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {array: newUsersInfo}
            )
        })
        .then(response => {
            console.log({array: newUsersInfo}); // os dados estão corretos
            console.log(response);
        })
        .catch(error => console.log(error));
    };

    // tratar em toda página que utilizar os dados .json para renderizar apenas se for !== undefined, pois o fetch é assíncrono
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home dataItens={itensInfo}/>}/>
                <Route path="/home" exact element={<Home dataItens={itensInfo}/>}/>
                {/* <Route path="/user" exact element={<User dataItens={itensInfo}/>}/> */}
                <Route path="/login" exact element={<Login dataUsers={usersInfo}/>}/>
                <Route path="/register" exact element={<Register dataUsers={usersInfo} addUser={addUser}/>}/>
                <Route path="/search/:itemName" exact element={<Search dataItens={itensInfo}/>}/>
                <Route path="/item/:itemId" exact element={<ItemDescr dataItens={itensInfo}/>}/>
                <Route path="/about-us" exact element={<AboutUs />}/>
            </Routes>
        </Router>
    );
};

export default App;