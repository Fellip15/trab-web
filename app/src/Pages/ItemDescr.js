import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import MiniMap from "../Components/MiniMap";
import './css/ItemDescr.css';

const ItemDescr = ({ dataItens }) => {
    // pega e trata os parâmetros da url (id do ítem)
    const params = useParams();
    const itemId = params.itemId;

    // atualiza a variável do ítem escolhido e a sua imagem atual de acordo com o banco e o id
    const [dataItem, setDataItem] = useState(undefined);
    const [currentImg, setCurrentImg] = useState(undefined);
    useEffect(() => {
        // verifica se os dados dos ítens já existem
        if (dataItens !== undefined) {
            const filteredItem = dataItens.filter(item => item.id == itemId)[0];
            setDataItem(filteredItem);
            setCurrentImg(filteredItem.srcImage[0]);
        }
        // caso contrário, busca no banco antes de fazer a filtragem    
        else {
            fetch('../data/itens.json')
                .then(data => data.json())
                .then(jsonData => jsonData.array.filter(item => item.id == itemId)[0])
                .then(filteredItem => {
                    setDataItem(filteredItem);
                    setCurrentImg(filteredItem.srcImage[0]);
                });
        }
    }, [dataItens, itemId]);

    // modifica subimagem a ser visualizada
    const changeCurrentSubImage = (event) => {
        const selectedImgPath = event.target.src.split('/img')[1];
        const newCurrentImg = './img' + selectedImgPath;
        setCurrentImg(newCurrentImg);
    };
    
    // direciona o usuário à tela de compra do ítem
    const navigate = useNavigate();
    const handleBuyItem = () => {
        navigate(`/buy/${dataItem.id}`);
    };

    // adiciona o item ao carrinho do usuário
    const handleAddCartItem = () => {
        alert('Item adicionado no carrinho (!!!tratar isso)');
    };

    return (
        dataItem !== undefined && <>
        <Header adjustPath={'../'}/>
        
        <div className="screen-item">
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
                        <img src={'../' + currentImg} />
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
                        <p className="font-inter-black">em estoque: {dataItem.stock}</p>
                        <p className="font-inter-black">vendidos: {dataItem.sold}</p>
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
                {/* <MiniMap coordnates={dataItem.coord}/> */}
            </div>
        </div>

        <Footer />
        </>
    );
};

export default ItemDescr;