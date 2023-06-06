import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../root.css';
import './HomeItem.css';

const HomeItem = ({ dataItem }) => {
    // direciona o usuário para a página do ítem selecionado
    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate(`/item/${dataItem.id}`);
    }

    return (
        <div className="item" onClick={handleItemClick}>
            <img src={dataItem.srcImage[0]} alt="item de venda" className="item-img"/>
            <div className="frame-7">
                <p className="item-name font-inter-white">{dataItem.name}</p>
                <p className="item-price font-inter-white">R${dataItem.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default HomeItem;