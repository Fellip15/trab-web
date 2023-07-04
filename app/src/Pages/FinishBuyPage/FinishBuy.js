import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import TableItensFinishBuy from "../../Components/FinishBuy/TableItens";
import { BsQrCode } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import "./FinishBuy.css";
import Message from '../../Components/Message';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseURL } from '../../config';


const FinishBuy = () => {
    const location = useLocation();
    const param = useParams();
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    const dateExpStr = "Data de vencimento";
    const personCardStr = "Titular do cartão";
    const numberCardStr = "Número do cartão";
    const cvvStr = "CVV";
    const cepStr = "CEP";
    const complementStr = "Complemento";
    const quarterStr = "Bairro";
    const streetStr = "Rua";
    const houseNumberStr = "Número da casa/apartamento";
    const personNumberStr = "Número de telefone";
    const cpfStr = "CPF";

    const [ itemsToBuy, setItemsToBuy ] = useState(undefined);
    const [ idUser, setIdUser ] = useState(undefined);
    const [ dateExp, setDateExp ] = useState("");
    const [ personCard, setPersonCard ] = useState("");
    const [ numberCard, setNumberCard ] = useState("");
    const [ cvv, setCvv ] = useState("");
    const [ cep, setCep ] = useState("");
    const [ complement, setComplement ] = useState("");
    const [ quarter, setQuarter ] = useState("");
    const [ street, setStreet ] = useState("");
    const [ houseNumber, setHouseNumber ] = useState("");
    const [ personNumber, setPersonNumber ] = useState("");
    const [ cpf, setCpf ] = useState("");

    const setUser = (user) => {
        console.log(user);
        setCep(user.end_cep);
        setQuarter(user.end_neighborhood);
        setStreet(user.end_street);
        setHouseNumber(user.end_num);
        setPersonNumber(user.tel);
        setCpf(user.cpf);
    }

    const authToken = async () => {
        await axios.get(baseURL + "/getUserByToken/" + cookies.user)
        .then((res) => {
            setUser(res.data.user);
        })
        .catch((e) => {
            console.log(e);
            if(e && e.response && e.response.status === 401) {
                removeCookies("user");
                navigate("/login", { state: { errorMessage: "Não autorizado!" }});
                return;
            }
            navigate("/", { state: { errorMessage: "Ocorreu algum erro" }});
        });
    };

    useEffect(() => {
        async function redirectAdmin() {
            if(cookies.user === undefined) {
                navigate("/login", { state: { 
                    errorMessage: "Se quiser entrar na tela de compra é necessário fazer o login"
                }});
                return;
            }
            const res = await axios.get(baseURL + "/isAdmin/" + cookies.user);

            if(res.admin !== undefined && res.admin === true) {
                navigate("/adm");
            }
        }
        redirectAdmin();

        if(!cookies.user) {
            return;
        }

        authToken();

        const id = param.idUser;
        if(id === undefined) {
            navigate("/login", { state: { 
                errorMessage: "Ocorreu algum erro!"
            }});
            return;
        }
        setIdUser(id);

        if(location.state !== null && location.state !== undefined && 
            location.state.itemToBuy !== null && location.state.itemToBuy !== undefined) {
                setItemsToBuy([location.state.itemToBuy]);
        } else {
            const cart = JSON.parse(localStorage.getItem("cart"));

            if(cart !== null && cart.itens !== null) {
                setItemsToBuy(cart[String(id)]);
            }
        }
    }, []);

    const card = (
        <div id="card">
            <div className="inputs-payment">
                <label htmlFor="card-number">Número do cartão:</label>
                <input value={numberCard} onChange={(e) => handleOnChange(e.target.value, setNumberCard)} type="text" id="card-number" name="card-number" />
            </div>
            <div className="inputs-payment">
                <label htmlFor="card-person">Titular:</label>
                <input value={personCard} onChange={(e) => handleOnChange(e.target.value, setPersonCard)} type="text" id="card-person" name="card-person" />
            </div>
            <div className="cvv-and-expiration">
                <div className="inputs-payment">
                    <label htmlFor="card-expiration">Vencimento:</label>
                    <input value={dateExp} onChange={(e) => handleOnChange(e.target.value, setDateExp)} type="date" id="card-expiration" name="card-expiration" />
                </div>
                <div className="inputs-payment">
                    <label htmlFor="cvv">cvv:</label>
                    <input value={cvv} onChange={(e) => handleOnChange(e.target.value, setCvv)} type="number" id="cvv" name="cvv" />
                </div>
            </div>
        </div>
    );
    
    const [ type, setType ] = useState("credit-card");
    const keyPix = "asda-s84s-asd2-aa8w-95ug";
    const pix = (
        <div id="pix">
            <div className="content-qrcode">
                <p>Escaneie o QR code ao lado e faça o pagamento. A confirmação será automática e instantânea após a verificação do pagamento.</p>
                <BsQrCode size={80} />
            </div>
            <p>Você pode copiar a chave:</p>
            <div id="payment-key-pix">
                <input type="text" id="key-pix" name="key-pix" defaultValue={keyPix} readOnly={true}/>
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
    const isEmpty = (value) => {
        if(value === null || value === undefined || value === ""){
            return true;
        }
        return false;
    }
    const handleFinishBuying = () => {
        const emptyInputs = [];
        console.log(type)
        if(type === "credit-card" || type === "debit-card") {
            console.log("Data:" + dateExp)
            if(isEmpty(dateExp)) emptyInputs.push(dateExpStr);
            if(isEmpty(personCard)) emptyInputs.push(personCardStr);
            if(isEmpty(numberCard)) emptyInputs.push(numberCardStr);
            if(isEmpty(cvv)) emptyInputs.push(cvvStr);
        }
        
        if(isEmpty(cep)) emptyInputs.push(cepStr);
        if(isEmpty(quarter)) emptyInputs.push(quarterStr);
        if(isEmpty(street)) emptyInputs.push(streetStr);
        if(isEmpty(houseNumber)) emptyInputs.push(houseNumberStr);
        if(isEmpty(personNumber)) emptyInputs.push(personNumberStr);
        if(isEmpty(cpf)) emptyInputs.push(cpfStr);

        if(emptyInputs.length > 0) {
            toast.warn("Há campos vazios: " + emptyInputs.join(", "));
            return;
        }

        const buyItens = {};
        for(let item of itemsToBuy) {
            buyItens[String(item._id)] = item.amount;
        }
        console.log(buyItens);
        axios.post(baseURL + "/item/buy", {
            itensToBuy: buyItens
        })
        .then((res) => {
            console.log(res.data.message);
            
            if(location.state === null || location.state === undefined || location.state.itemToBuy === null || location.state.itemToBuy === undefined) {
                const cart = JSON.parse(localStorage.getItem("cart"));
                delete cart[String(idUser)];
                if(Object.keys(cart).length <= 0)
                    localStorage.removeItem("cart");
                else 
                    localStorage.setItem("cart", JSON.stringify(cart));
            }
    
            navigate("/", { state: { successMessage:"Sua compra foi realizada com sucesso!" }});
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        })

    }

    const handleOnChange = (value, setValue) => {
        setValue(value);
    };

    return (
        <>
            <Header />
            <Message />

            { itemsToBuy !== undefined &&
                (
                    <div className="content finish-buy-screen">
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
                                            <input value={cep} onChange={(e) => handleOnChange(e.target.value, setCep)} id='cep' name='cep'/>
                                        </div>
                                        <div className='inputs-address-three'>
                                            <label htmlFor='complement'>Compl:</label>
                                            <input value={complement} onChange={(e) => handleOnChange(e.target.value, setComplement)} id='complement' name='complement'/>
                                        </div>
                                        <div className='inputs-address-three'>
                                            <label htmlFor='house-number'>N°:</label>
                                            <input value={houseNumber} onChange={(e) => handleOnChange(e.target.value, setHouseNumber)} id='house-number' name='house-number'/>
                                        </div>
                                    </div>
                                    <div className='cep-complement-number'>
                                        <div className='inputs-address'>
                                            <label htmlFor='street'>Rua:</label>
                                            <input value={street} onChange={(e) => handleOnChange(e.target.value, setStreet)} id='street' name='street'/>
                                        </div>
                                        <div className='inputs-address'>
                                            <label htmlFor='quarter'>Bairro:</label>
                                            <input value={quarter} onChange={(e) => handleOnChange(e.target.value, setQuarter)} id='quarter' name='quarter'/>
                                        </div>
                                    </div>
                                    <div className='inputs-address'>
                                        <label htmlFor='cpf'>CPF:</label>
                                        <input value={cpf} onChange={(e) => handleOnChange(e.target.value, setCpf)} id='cpf' name='cpf'/>
                                    </div>
                                    <div className='inputs-address'>
                                        <label htmlFor='person-number'>Telef:</label>
                                        <input value={personNumber} onChange={(e) => handleOnChange(e.target.value, setPersonNumber)} id='person-number' name='person-number'/>
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