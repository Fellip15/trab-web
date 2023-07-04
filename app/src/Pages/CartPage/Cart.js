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
    const [ idUser, setIdUser ] = useState(undefined);
    const removeCartItem = (event, id) => {
        let isToRemove = window.confirm("Tem certeza que deseja remover o item?");
        if(!isToRemove) return;
        
        const newDataItens = dataItens.filter((item) => String(item._id) !== String(id));
        
        setDataItens([...newDataItens]);
        updateCart(newDataItens);
    };
    const updateCart = (dataItens) => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        
        if(dataItens === undefined || dataItens === null || dataItens.length <= 0) {
            delete cart[String(idUser)];

            if(Object.keys(cart).length <= 0)
                localStorage.removeItem("cart");
            else 
                localStorage.setItem("cart", JSON.stringify(cart));
            setDataItens(undefined);
            navigate("/", { state: { infoMessage: "Carrinho vazio!" }});
        } else {
            cart[String(idUser)] = dataItens;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    };
    
    useEffect(() => {
        async function asyncGetCart() {
            await axios.get(baseURL + "/getUserByToken/" + cookies.user)
            .then(async (res) => {
                console.log(res.data);
                const user = res.data.user;
                setIdUser(user._id);
                
                const cart = await JSON.parse(localStorage.getItem("cart"));
                console.log(cart)
                if(cart === null || cart[user._id] === null) {
                    navigate("/", { state: { infoMessage:"O carrinho está vazio!" }});
                    return;
                }
                const userCart = cart[String(user._id)];
                
                setDataItens(userCart);
            })
            .catch((e) => {
                console.log(e);
                if(e.response.status === 401) {
                    removeCookies("user");
                    navigate("/login", { state: { errorMessage: "Não autorizado!" }});
                    return;
                }
                navigate("/", { state: { errorMessage: "Ocorreu algum erro" }});
            });
        }
        asyncGetCart();

    }, []);

    const handleBuyButton = () => {
        navigate("/buy/" + idUser);
    };
    const handleHomeButton = () => {
        navigate("/");
    };
    const handleClearCart = () => {
        let isToRemove = window.confirm("Tem certeza que deseja remover os itens?");
        if(!isToRemove) return;
        const teste = {};

        const cart = JSON.parse(localStorage.getItem("cart"));

        delete cart[String(idUser)];
        if(Object.keys(cart).length <= 0)
            localStorage.removeItem("cart");
        else 
            localStorage.setItem("cart", JSON.stringify(cart));

        setDataItens(undefined);
        navigate("/", { state: { successMessage: "Carrinho limpo!"}});
    };

    return (
        <>
            <Header />
            {dataItens !== undefined && 
                <div className="container-cart content">
                    <h1 className="font-title-black">Carrinho</h1>
                    <div className='cart'>
                        <CartItemList dataItens={dataItens} removeCartItem={removeCartItem}/>
                        <div className="cart-buttons">
                            <input type="button" onClick={handleClearCart} id="clear-cart-button" name='clear-cart-button' value="Limpar carrinho"/>
                            <input type="button" onClick={handleBuyButton} id="buy-button" name='buy-button' value="Finalizar compra"/>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    );
};

export default Cart;