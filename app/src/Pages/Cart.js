import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./css/Cart.css";

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CartItens from '../Components/Cart/Itens';


const Cart = () => {
    const navigate = useNavigate();

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    let userId = 0;
    
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
    
    useEffect(() => {
        if (cookies.user) {
            userId = Number(cookies.user);
        } else {
            navigate("/login", { state: { errorMessage: "Se quiser entrar no carrinho é necessário fazer o login" }});
        }

        const cart = JSON.parse(localStorage.getItem("cart"));

        if(cart !== null && cart !== undefined && cart.itens !== null && cart.itens !== undefined) {
            setDataItens(cart.itens);
        } else {
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
        localStorage.removeItem("cart");
        setDataItens(undefined);
    };

    return (
        <>
            <Header />
            <div className="container-cart content">
                <h1 className="font-title-black">Carrinho</h1>
                <div className='cart'>
                    <CartItens dataItens={dataItens} removeCartItem={removeCartItem}/>
                    { (dataItens !== undefined && dataItens !== null && dataItens.length > 0) &&
                        <div className="cart-buttons">
                            <input type="button" onClick={handleClearCart} id="clear-cart-button" name='clear-cart-button' value="Limpar carrinho"/>
                            <input type="button" onClick={handleBuyButton} id="buy-button" name='buy-button' value="Finalizar compra"/>
                        </div>
                    }
                    { !(dataItens !== undefined && dataItens !== null && dataItens.length > 0) &&
                        <input type="button" onClick={handleHomeButton} id="home-button" name='home-button' value="Ir para Home"/>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;