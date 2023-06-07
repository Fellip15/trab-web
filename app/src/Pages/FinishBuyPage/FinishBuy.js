import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import TableItensFinishBuy from "../../Components/FinishBuy/TableItens";
import { BsQrCode } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import "./FinishBuy.css";


const FinishBuy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    let userId;

    const [ itemsToBuy, setItemsToBuy ] = useState(undefined);
    const dateExpRef = useRef();
    const personCardRef = useRef();
    const numberCardRef = useRef();
    const cvvRef = useRef();
    const cepRef = useRef();
    const complementRef = useRef();
    const quarterRef = useRef();
    const streetRef = useRef();
    const houseNumberRef = useRef();
    const personNumberRef = useRef();
    const cpfRef = useRef();

    useEffect(() => {
        if (cookies.user) {
            userId = Number(cookies.user);
        } else {
            navigate("/login", { state: { errorMessage: "Se quiser entrar na tela de compra é necessário fazer o login" }});
        }

        if(location.state !== null && location.state !== undefined && 
            location.state.itemToBuy !== null && location.state.itemToBuy !== undefined) {
                setItemsToBuy([location.state.itemToBuy]);
        } else {
            const cart = JSON.parse(localStorage.getItem("cart"));
            console.log(cart)
            if(cart !== null && cart.itens !== null) {
                setItemsToBuy(cart.itens);
            }
        }
    }, []);

    const card = (
        <div id="card">
            <div className="inputs-payment">
                <label htmlFor="card-number">Número do cartão:</label>
                <input ref={numberCardRef} type="text" id="card-number" name="card-number" />
            </div>
            <div className="inputs-payment">
                <label htmlFor="card-person">Titular:</label>
                <input ref={personCardRef} type="text" id="card-person" name="card-person" />
            </div>
            <div className="cvv-and-expiration">
                <div className="inputs-payment">
                    <label htmlFor="card-expiration">Vencimento:</label>
                    <input ref={dateExpRef} type="date" id="card-expiration" name="card-expiration" />
                </div>
                <div className="inputs-payment">
                    <label htmlFor="cvv">cvv:</label>
                    <input ref={cvvRef} type="number" id="cvv" name="cvv" />
                </div>
            </div>
        </div>
    );
    
    const [ type, setType ] = useState(undefined);
    const keyPix = "asda-s84s-asd2-aa8w-95ug";
    const pix = (
        <div id="pix">
            <div className="content-qrcode">
                <p>Escaneie o QR code ao lado e faça o pagamento. A confirmação será automática e instantânea após a verificação do pagamento.</p>
                <BsQrCode size={80} />
            </div>
            <p>Você pode copiar a chave:</p>
            <div id="payment-key-pix">
                <input type="text" id="key-pix" name="key-pix" value={keyPix} readOnly={true}/>
                <BiCopy id="copy-key-pix" onClick={() => {navigator.clipboard.writeText(keyPix); alert("Chave copiada")}}/>
            </div>
        </div>
    );

    const handleSelectPayment = (event) => {
        const newType = event.target.value; 
        setType(newType);
    };

    const chooseTypePayment = () => {
        if(type === "pix") {
            return pix;
        } else {
            return card;
        }
    };

    const handleCancelBuying = () => {
        navigate("/");
    }
    const handleFinishBuying = () => {
        const verifyInputs =       dateExpRef.current.value === ""
                                || personCardRef.current.value === ""
                                || numberCardRef.current.value === ""
                                || cvvRef.current.value === ""
                                || cepRef.current.value === ""
                                || complementRef.current.value === ""
                                || quarterRef.current.value === ""
                                || streetRef.current.value === ""
                                || houseNumberRef.current.value === ""
                                || personNumberRef.current.value === ""
                                || cpfRef.current.value === "";
        
        if(verifyInputs) {
            alert("É necessário preencher todos inputs");
            return;
        }

        alert("Sua compra foi finalizada");
        localStorage.removeItem("cart");
        navigate("/");
    }

    return (
        <>
            <Header />
            { itemsToBuy !== undefined &&
                (
                    <div className="content finish-buy-screen fixed-screen">
                        <div className="buy-infos">
                            <div className='buy-table'>
                                <TableItensFinishBuy itens={itemsToBuy} />
                            </div>
                            <div className='division'></div>
                            <div className='buy-inputs'>
                                <div id="payment">
                                    <select id='type-payment' onChange={(event) => handleSelectPayment(event)}>
                                        <option value="credit-card">Cartão de crédito</option>
                                        <option value="debit-card">Cartão de débito</option>
                                        <option value="pix">Pix</option>
                                    </select>
                                    {chooseTypePayment()}
                                </div>
                                <div className='address'>
                                    <div className='cep-complement-number'>
                                        <div className='inputs-address-three'>
                                            <label htmlFor='cep'>CEP:</label>
                                            <input ref={cepRef} id='cep' name='cep'/>
                                        </div>
                                        <div className='inputs-address-three'>
                                            <label htmlFor='complement'>Compl:</label>
                                            <input ref={complementRef} id='complement' name='complement'/>
                                        </div>
                                        <div className='inputs-address-three'>
                                            <label htmlFor='house-number'>N°:</label>
                                            <input ref={houseNumberRef} id='house-number' name='house-number'/>
                                        </div>
                                    </div>
                                    <div className='cep-complement-number'>
                                        <div className='inputs-address'>
                                            <label htmlFor='street'>Rua:</label>
                                            <input ref={streetRef} id='street' name='street'/>
                                        </div>
                                        <div className='inputs-address'>
                                            <label htmlFor='quarter'>Bairro:</label>
                                            <input ref={quarterRef} id='quarter' name='quarter'/>
                                        </div>
                                    </div>
                                    <div className='inputs-address'>
                                        <label htmlFor='cpf'>CPF:</label>
                                        <input ref={cpfRef} id='cpf' name='cpf'/>
                                    </div>
                                    <div className='inputs-address'>
                                        <label htmlFor='person-number'>Telef:</label>
                                        <input ref={personNumberRef} id='person-number' name='person-number'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buying-buttons">
                            <input onClick={handleCancelBuying} type="button" id="cancel-buying-button" name='cancel-cart-button' value="Cancelar compra"/>
                            <input onClick={handleFinishBuying} type="button" id="buy-button" name='buy-button' value="Comprar"/>
                        </div>
                    </div>
                )
            }
            { itemsToBuy === undefined &&
                <div className="finish-buy-screen content">
                    Para comprar o item você deve add no carrinho ou comprar direto com o item.
                    <div id='back-to-home' onClick={() => navigate("/")}>Voltar para a home</div>
                </div>
            }
            <Footer />
        </>
    );
};

export default FinishBuy;