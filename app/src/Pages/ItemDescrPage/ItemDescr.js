import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MiniMap from "../../Components/MiniMap";
import './ItemDescr.css';
import Message from "../../Components/Message";
import { toast } from "react-toastify";
import axios from "axios";
import { baseURL } from "../../config";
import { useCookies } from "react-cookie";

const ItemDescr = ({ addCartItem }) => {
    const locate = useLocation();
    const [ cookies, setCookies, removeCookies ] = useCookies(["user"]);

    // pega e trata os parâmetros da url (id do ítem)
    const params = useParams();
    
    
    // atualiza a variável do ítem escolhido e a sua imagem atual de acordo com o banco e o id
    const [ fetched, setFetched ] = useState(false);
    const [ idUser, setIdUser ] = useState(undefined);
    const [dataItem, setDataItem] = useState(undefined);
    const [currentImg, setCurrentImg] = useState(undefined);
    const [ storageImages, setStorageImages ] = useState([]);
    useEffect(() => {
        const itemId = params.itemId;
        // verifica se os dados dos ítens já existem
        if (!fetched) {
            axios.get(baseURL + "/item/" + itemId)
            .then((res) => {
                setDataItem(res.data.item);
                setFetched(true);
                loadImages(res.data.item);
            })
            .catch((e) => {
                toast.error(e.response.data.message);
            });
        }

        if(locate.state && locate.state.successMessage) {
            toast.success(locate.state.successMessage);
        }
        if(locate.state && locate.state.errorMessage) {
            toast.error(locate.state.errorMessage);
        }

        authToken();
    }, [locate]);

    const loadImages = async (item) => {
        const imagesStorage = [];
        for(let i = 0; i < item.images.length; i++) {
            await axios.get(baseURL + "/image/" + item.images[i])
            .then((res) => {
                imagesStorage.push(res.data.image);
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data.message);
            });
        }
        console.log("Imagens")
        console.log(imagesStorage);
        setStorageImages([...imagesStorage]);
        if(imagesStorage.length > 0) {
            setCurrentImg(imagesStorage[0].src);
        }
    }
    
    // modifica subimagem a ser visualizada
    const changeCurrentSubImage = (src) => {
        setCurrentImg(src);
    };
    
    const refAmount = useRef(null);
    // direciona o usuário à tela de compra do ítem
    const navigate = useNavigate();
    const handleBuyItem = () => {
        const itemToBuy = dataItem;
        itemToBuy.amount = refAmount.current.value;
        navigate(`/buy/${idUser}`, {state: {itemToBuy: itemToBuy}});
    };

    const authToken = async () => {
        let user = undefined;
        await axios.post(baseURL + "/users/token", {
            token: cookies.user
        })
        .then((res) => {
            console.log(res.data.user);
            user = res.data.user;
            setIdUser(user._id);
        })
        .catch((e) => {
            removeCookies("user");
        });

        return user;
    };

    // adiciona o item ao carrinho do usuário
    const handleAddCartItem = () => {
        if(idUser === undefined) {
            toast.warn("Para adicionar um item ao carrinho é necessário estar logado!");
            return;
        }

        addCartItem(idUser, dataItem, refAmount.current.value);
        navigate('/', { state: { successMessage: "Item adicionado ao carrinho"} });
    };

    const chooseInputAmount = () => {
        if(dataItem.stock > 0) {
            return <input type="number" id="amount" ref={refAmount} defaultValue={1} min={1} max={dataItem.stock} disabled={Number(dataItem.stock) <= 0}/>
        }

        return <input type="text" id="amount" ref={refAmount} value="Fora de estoque" disabled/>
    };

    return (
        fetched && <>
        <Header/>
        <Message />
        
        <div className="screen-item content">
            <div className="data-item">
                <div className="imgs-item">
                    <div className="sub-imgs-item">
                        {storageImages.map((image) => {
                            const srcImg = image.src;
                            if (image.src === currentImg)
                                return <img key={image._id} src={baseURL + '/' + srcImg} className="sub-image-selected"/>
                            else
                                return <img key={image._id} src={baseURL + '/' + srcImg} className="sub-image" onClick={(e) => changeCurrentSubImage(srcImg)}/>
                        })}
                    </div>
                    <div className="current-image-item">
                        <img src={baseURL + '/' + currentImg} id="current-image" />
                    </div>
                </div>
                <div className="info-item">
                    <p className="item-info-name">{dataItem.name}</p>
                    <div className="row-item-info">
                        <p className="item-info-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                        <div className="item-info-price">
                            <p className="font-inter-black">ou</p>
                            <img src="../img/icons/credit-card.png" alt="cartão de crédito"/>    
                            <p className="font-inter-black">{dataItem.numParc}x de R${Number(dataItem.price) / Number(dataItem.numParc)}</p>
                        </div>
                    </div>
                    <div className="row-item-info">
                        <p className="item-info-price font-inter-black">em estoque: {dataItem.stock}</p>
                        <p className="item-info-price font-inter-black">vendidos: {dataItem.sold}</p>
                    </div>
                    <div>
                        {chooseInputAmount()}
                    </div>
                    <div className="buttons-item-info">
                        <input 
                            type="button"
                            onClick={handleBuyItem} 
                            name="button" 
                            className="button-buy" 
                            value="Comprar item"
                            disabled={Number(dataItem.stock) <= 0}
                            />
                        <input 
                            type="button"
                            onClick={handleAddCartItem} 
                            name="button" 
                            className="button-add-cart" 
                            value="Adicionar ao carrinho"
                            disabled={Number(dataItem.stock) <= 0}
                        />
                    </div>
                    <div className="descr-item-info">
                        {dataItem.description}
                    </div>
                </div>
            </div>
            <div className="location-item">
                <h2>Localização do item:</h2>
                <MiniMap coordnates={[dataItem.latitude, dataItem.longitude]} size={['100%', '400px']}/>
            </div>
        </div>

        <Footer />
        </>
    );
};

export default ItemDescr;