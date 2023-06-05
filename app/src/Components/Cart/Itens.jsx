import React, { useState } from 'react';
import '../../root.css';
import '../css/CartItens.css';
import CartItem from './Item';

const CartItens = ({ dataItens, removeCartItem }) => {
    const verifyItens = (itens) => {
        return !(itens === undefined || itens === null || itens.length <= 0);
    };

    return (
        <>
            { verifyItens(dataItens) && 
                (<>
                <div className="list-itens-cart">
                    {dataItens.map(
                        item => <CartItem key={item.id} dataItem={item} removeCartItem={removeCartItem} />
                    )}
                </div>
                </>)
            }
            { !verifyItens(dataItens) &&
                (<p>O carrinho está vazio, entre no item e adicione ele no carrinho.</p>)
            }
        </>
    );
};

export default CartItens;