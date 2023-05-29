import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../root.css';
import '../css/SearchItens.css';

const SearchItem = ({ dataItem }) => {
    // direciona o usuário para a página do ítem selecionado
    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate(`/item/${dataItem.id}`);
    }

    return (
        <div className="search-item" onClick={handleItemClick}>
            <div className="content-info-search">
                <div className="img-item-search">
                    <img src={'../' + dataItem.srcImage[0]} alt="item de venda" className="item-img"/>
                </div>
                <div className="info-item-search">
                    <p className="item-search-name">{dataItem.name}</p>
                    <div className="row-item-price">
                        <p className="item-search-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                        <div className="item-search-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.numParc}x de R${dataItem.priceParc.toFixed(2)}</p>
                        </div>
                    </div>
                    <p className="font-inter-black">qtde: {dataItem.stock}</p>
                </div>
            </div>
            <div className="descr-item-search">
                {dataItem.description}
            </div>
        </div>
    );
};

export default SearchItem;