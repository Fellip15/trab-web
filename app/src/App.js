import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";

import Home         from './Pages/HomePage/Home';
import User         from './Pages/UserPage/User';
import Login        from './Pages/LoginPage/Login';
import Register     from './Pages/RegisterPage/Register';
import Search       from './Pages/SearchPage/Search';
import ItemDescr    from './Pages/ItemDescrPage/ItemDescr';
import AboutUs      from './Pages/AboutUsPage/AboutUs';
import Adm          from './Pages/AdmPage/Adm';
import Cart         from './Pages/CartPage/Cart';
import EditItem     from './Pages/EditItemPage/EditItem';
import FinishBuy    from './Pages/FinishBuyPage/FinishBuy';

import orgUsersInfo from './data/users.json';
import orgItensInfo from './data/itens.json'; 
import { baseURL } from './config';
import axios from 'axios';
import { useCookies } from 'react-cookie';


// define as rotas da aplicação para cada componente
const App = () => {
    const [ cookies, setCookies, removeCookies ] = useCookies(["user"]);

    // lê o json das informações da aplicação e atribui à variáveis
    const [itensInfo, setItensInfo] = useState(undefined);
    const [usersInfo, setUsersInfo] = useState(undefined);

    useEffect(() => {
        setUsersInfo(orgUsersInfo);
        setItensInfo(orgItensInfo['array']);
    }, []);

    console.log("Start: ", itensInfo)

    // adiciona um novo usuário no banco (!!!!!o post ta dando status 404)
    const addUser = (newUser) => {
        // atualiza a lista de usuários
        usersInfo.push(newUser);
        setUsersInfo(usersInfo);
    };

    // remove o ítem indicado no banco (!!!!!o post ta dando status 404)
    const remItem = (itemId) => {
        // atualiza os dados da var
        const newItensInfo = itensInfo.filter(item => item.id !== itemId);
        setItensInfo(newItensInfo);
    };

    const addCartItem = async (idUser, item, amount) => {
        if(idUser === undefined) {
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart === undefined || cart === null) {
            cart = {}
        }

        let srcImage = null;
        if(item.images !== null && item.images.length > 0) {
            await axios.get(baseURL + "/image/" + item.images[0])
            .then((res) => {
                srcImage = res.data.image;
            })
            .catch((e) => {
                console.log(e);
            })
        }

        let itemToAdd = item;
        itemToAdd.amount = Number(amount);
        itemToAdd.image = srcImage.src;
        if(cart[String(idUser)] === undefined) {
            cart[String(idUser)] = [];
        }
        cart[String(idUser)].push(itemToAdd);

        console.log(cart.itens);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // tratar em toda página que utilizar os dados .json para renderizar apenas se for !== undefined, pois o fetch é assíncrono
    return (
        <Router>
            <Routes>
                {/* Rotas de usuário comum */}
                <Route path="/" exact element={<Home dataItens={itensInfo}/>}/>
                <Route path="/home" exact element={<Home usersInfo={usersInfo} dataItens={itensInfo}/>}/>
                <Route path="/user" exact element={<User dataItens={itensInfo}/>}/>
                <Route path="/login" exact element={<Login dataUsers={usersInfo}/>}/>
                <Route path="/register" exact element={<Register dataUsers={usersInfo} addUser={addUser}/>}/>
                <Route path="/search/:itemName" exact element={<Search dataItens={itensInfo}/>}/>
                <Route path="/item/:itemId" exact element={<ItemDescr dataItens={itensInfo} addCartItem={addCartItem}/>}/>
                <Route path="/about-us" exact element={<AboutUs />}/>
                <Route path="/cart" exact element={<Cart />}/>
                <Route path="/buy/:idUser" exact element={<FinishBuy/>}/>

                {/* Rotas de administradores */}
                <Route path="/adm" exact element={<Adm dataItens={itensInfo} setItems={setItensInfo} remItem={remItem} />}/>
                <Route path="/adm/edit/:itemId" exact element={<EditItem dataItens={itensInfo} setItems={setItensInfo}/>}/>
            </Routes>
        </Router>
    );
};

export default App;