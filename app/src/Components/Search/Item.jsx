import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../root.css';
import '../css/SearchItens.css';

const Item = ({ dataItem }) => {
    // direciona o usuário para a página do ítem selecionado
    const navigate = useNavigate();
    const handleItemClick = () => {
        navigate(`/item:${dataItem.id}`);
    }

    return (
        <div className="item" onClick={handleItemClick}>
            <div className="column">
                <img src={dataItem.srcImage} alt="item de venda" className="item-img"/>
            </div>
            <div className="column">
                <p className="item-name font-inter-white">{dataItem.name}</p>
                <div className="row">
                    <p className="item-price font-inter-white">R${dataItem.price.toFixed(2)}</p>
                    <p className="font-inter-white">
                        ou
                        <img src="./img/icons/credit-card.png" alt="cartão de crédito"/>
                        {dataItem.numParc}x de R${dataItem.priceParc.toFixed(2)}
                    </p>
                </div>
                <p className="item-quant font-inter-white">qtde: {dataItem.stock}</p>
            </div>
            <div className="column">
                {dataItem.description}
            </div>
        </div>
    );
};

export default Item;