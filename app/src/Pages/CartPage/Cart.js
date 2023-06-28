import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./Cart.css";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import CartItemList from '../../Components/Cart/CartItemList';
import axios from 'axios';
import { baseURL } from '../../config';

const Cart = () => {
    const navigate = useNavigate();

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    
    const [ dataItens, setDataItens ] = useState(undefined);
    const removeCartItem = (event, id) => {
        let isToRemove = window.confirm("Tem certeza que deseja remover o item?");
        if(!isToRemove) return;

        const newDataItens = dataItens.filter((item) => Number(item.id) !== Number(id));
        setDataItens([...newDataItens]);
        updateCart(newDataItens);
    };
    const updateCart = (dataItens) => {
        if(dataItens === undefined || dataItens === null || dataItens.length <= 0) {
            localStorage.removeItem("cart");
        } else {
            localStorage.setItem("cart", JSON.stringify({ itens: dataItens }));
        }
    };

    const authToken = async () => {
        let user = undefined;
        await axios.post(baseURL + "/users/token", {
            token: cookies.user
        })
        .then((res) => {
            console.log(res.data.user);
            user = res.data.user;
        })
        .catch((e) => {
            removeCookies("user");
            navigate("/login", { state: { 
                errorMessage: e.response.data.message
            }});
        });

        return user;
    };
    
    useEffect(() => {
        authToken();

        const cart = JSON.parse(localStorage.getItem("cart"));

        if(cart !== null && cart !== undefined && cart.itens !== null && cart.itens !== undefined) {
            setDataItens(cart.itens);
        } else {
            navigate("/", { state: { infoMessage:"O carrinho está vazio!" }});
            setDataItens([]);
        }
    }, []);

    const handleBuyButton = () => {
        navigate("/buy");
    };
    const handleHomeButton = () => {
        navigate("/");
    };
    const handleClearCart = () => {
        let isToRemove = window.confirm("Tem certeza que deseja remover os itens?");
        if(!isToRemove) return;

        localStorage.removeItem("cart");
        setDataItens(undefined);
    };

    return (
        <>
            <Header />
            <div className="container-cart content">
                <h1 className="font-title-black">Carrinho</h1>
                <div className='cart'>
                    <CartItemList dataItens={dataItens} removeCartItem={removeCartItem}/>
                    { (dataItens !== undefined && dataItens !== null && dataItens.length > 0) &&
                        <div className="cart-buttons">
                            <input type="button" onClick={handleClearCart} id="clear-cart-button" name='clear-cart-button' value="Limpar carrinho"/>
                            <input type="button" onClick={handleBuyButton} id="buy-button" name='buy-button' value="Finalizar compra"/>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;