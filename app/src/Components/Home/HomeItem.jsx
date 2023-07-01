import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../root.css';
import './HomeItem.css';
import { baseURL } from '../../config';

const HomeItem = ({ cardItem }) => {
    // direciona o usuário para a página do ítem selecionado
    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate(`/item/${cardItem.item._id}`);
    }

    const srcImage = () => {
        if(cardItem.image === null) return "";
        return baseURL + "/" + cardItem.image;
    };

    return (
        <div className="item" onClick={handleItemClick}>
            <img src={srcImage()} alt="item de venda" className="item-img"/>
            <div className="frame-7">
                <p className="item-name font-inter-white">{cardItem.item.name}</p>
                <p className="item-price font-inter-white">R${cardItem.item.price.toFixed()}</p>
            </div>
        </div>
    );
};

export default HomeItem;