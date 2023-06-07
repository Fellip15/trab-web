import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MiniMap from "../../Components/MiniMap";
import './ItemDescr.css';

const ItemDescr = ({ dataItens, addCartItem }) => {
    // pega e trata os parâmetros da url (id do ítem)
    const params = useParams();
    const itemId = params.itemId;

    // atualiza a variável do ítem escolhido e a sua imagem atual de acordo com o banco e o id
    const [dataItem, setDataItem] = useState(undefined);
    const [currentImg, setCurrentImg] = useState(undefined);
    useEffect(() => {
        // verifica se os dados dos ítens já existem
        if (dataItens !== undefined) {
            const filteredItem = dataItens.filter(item => Number(item.id) === Number(itemId))[0];

            setDataItem(filteredItem);
            setCurrentImg(filteredItem.srcImage[0]);
        }
        // caso contrário, busca no banco antes de fazer a filtragem    
        else {
            fetch('../data/itens.json')
                .then(data => data.json())
                .then(jsonData => jsonData.array.filter(item => Number(item.id) === Number(itemId))[0])
                .then(filteredItem => {
                    setDataItem(filteredItem);
                    setCurrentImg(filteredItem.srcImage[0]);
                });
        }
    }, [dataItens, itemId]);

    // modifica subimagem a ser visualizada
    const changeCurrentSubImage = (event) => {
        const selectedImgPath = event.target.src.split('/img')[1];
        const newCurrentImg = '/img' + selectedImgPath;
        setCurrentImg(newCurrentImg);
    };
    
    // direciona o usuário à tela de compra do ítem
    const navigate = useNavigate();
    const handleBuyItem = () => {
        const itemToBuy = dataItem;
        dataItem.amount = 1;
        navigate(`/buy`, {state: {itemToBuy: itemToBuy}});
    };

    // adiciona o item ao carrinho do usuário
    const handleAddCartItem = () => {
        const amount = 1;
        addCartItem(itemId, amount);
        alert('Item adicionado ao carrinho');
        navigate('/');
    };

    return (
        dataItem !== undefined && <>
        <Header/>
        
        <div className="screen-item content">
            <div className="data-item">
                <div className="imgs-item">
                    <div className="sub-imgs-item">
                        {dataItem.srcImage.map((srcImg, index) => {
                            if (srcImg === currentImg)
                                return <img key={index} src={'../' + srcImg} className="sub-image-selected"/>
                            else
                                return <img key={index} src={'../' + srcImg} className="sub-image" onClick={changeCurrentSubImage}/>
                        })}
                    </div>
                    <div className="current-image-item">
                        <img src={'../' + currentImg} id="current-image" />
                    </div>
                </div>
                <div className="info-item">
                    <p className="item-info-name">{dataItem.name}</p>
                    <div className="row-item-info">
                        <p className="item-info-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                        <div className="item-info-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.numParc}x de R${dataItem.priceParc.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="row-item-info">
                        <p className="item-info-price font-inter-black">em estoque: {dataItem.stock}</p>
                        <p className="item-info-price font-inter-black">vendidos: {dataItem.sold}</p>
                    </div>
                    <div className="buttons-item-info">
                        <input 
                            type="button"
                            onClick={handleBuyItem} 
                            name="button" 
                            className="button-buy" 
                            value="Comprar item"
                        />
                        <input 
                            type="button"
                            onClick={handleAddCartItem} 
                            name="button" 
                            className="button-add-cart" 
                            value="Adicionar ao carrinho"
                        />
                    </div>
                    <div className="descr-item-info">
                        {dataItem.description}
                    </div>
                </div>
            </div>
            <div className="location-item">
                <h2>Localização do item:</h2>
                <MiniMap coordnates={dataItem.coord} size={['100%', '400px']}/>
            </div>
        </div>

        <Footer />
        </>
    );
};

export default ItemDescr;