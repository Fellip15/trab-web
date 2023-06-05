import React, { useEffect, useState } from 'react';
import '../../root.css';
import '../css/CartItens.css';

import { AiFillDelete } from "react-icons/ai";

const CartItem = ({ dataItem, removeCartItem}) => {
    return (
        <div className="cart-item">
            <div className="buttons">
                <AiFillDelete id="remove-button" onClick={(event) => removeCartItem(event, dataItem.id)}/>
            </div>
            <div className="content-info-cart">
                <div className="img-item-cart">
                    <img src={'../' + dataItem.srcImage[0]} alt="item de venda" className="item-img"/>
                </div>
                <div className="info-item-cart">
                    <p className="item-cart-name">{dataItem.name}</p>
                    <div className="row-item-price">
                        <p className="item-cart-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                        <div className="item-cart-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.numParc}x de R${dataItem.priceParc.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="font-inter-black">qtde: {dataItem.amount}</p>
                </div>
                <div className='total-item-price'>
                    <p>R${dataItem.price.toFixed(2)} x {dataItem.amount}</p>
                    <p>=</p>
                    <p>R${(dataItem.price*dataItem.amount).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;