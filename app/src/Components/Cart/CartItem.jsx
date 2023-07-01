import React from 'react';
import './CartItem.css';

import { AiFillDelete } from "react-icons/ai";
import { baseURL } from '../../config';

const CartItem = ({ dataItem, removeCartItem}) => {
    return (
        <div className="cart-item">
            <div className="buttons">
                <AiFillDelete id="remove-button" onClick={(event) => removeCartItem(event, dataItem._id)}/>
            </div>
            <div className="content-info-cart">
                <div className="img-item-cart">
                    <img src={baseURL + '/' + dataItem.image} alt="item de venda" className="item-img"/>
                </div>
                <div className="info-item-cart">
                    <p className="item-cart-name">{dataItem.name}</p>
                    <div className="row-item-price">
                        <p className="item-cart-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                        <div className="item-cart-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.numParc}x de R${Number(dataItem.price) / Number(dataItem.numParc)}</p>
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