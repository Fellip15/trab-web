import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../root.css';
import './SearchItem.css';
import { baseURL } from '../../config';

const SearchItem = ({ dataItem }) => {
    // direciona o usuário para a página do ítem selecionado
    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate(`/item/${dataItem._id}`);
    }

    return (
        <div className="search-item" onClick={handleItemClick}>
            <div className="content-info-search">
                <div className="img-item-search">
                    <img src={baseURL +  '/' + dataItem.image} alt="item de venda" className="item-img"/>
                </div>
                <div className="info-item-search">
                    <p className="item-search-name">{dataItem.item.name}</p>
                    <div className="row-item-price">
                        <p className="item-search-price font-inter-strong">R${dataItem.item.price.toFixed(2)}</p>
                        <div className="item-search-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.item.numParc}x de R${Number(dataItem.item.price) / Number(dataItem.item.numParc)}</p>
                        </div>
                    </div>
                    <p className="font-inter-black">qtde: {dataItem.item.stock}</p>
                </div>
            </div>
            <div className="descr-item-search">
                {dataItem.description}
            </div>
        </div>
    );
};

export default SearchItem;