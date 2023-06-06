import React, { useState } from "react";
import "./PaymentType.css";

import { BsQrCode } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

const PaymentType = ({ type, setType}) => {
    const card = (
        <div id="card">
            <div className="inputs-payment">
                <label htmlFor="card-number">Número do cartão:</label>
                <input type="text" id="card-number" name="card-number" />
            </div>
            <div className="inputs-payment">
                <label htmlFor="card-person">Titular:</label>
                <input type="text" id="card-person" name="card-person" />
            </div>
            <div className="cvv-and-expiration">
                <div className="inputs-payment">
                    <label htmlFor="card-expiration">Vencimento:</label>
                    <input type="date" id="card-expiration" name="card-expiration" />
                </div>
                <div className="inputs-payment">
                    <label htmlFor="cvv">cvv:</label>
                    <input type="number" id="cvv" name="cvv" />
                </div>
            </div>
        </div>
    );

    const keyPix = "asda-s84s-asd2-aa8w-95ug";
    const pix = (
        <div id="pix">
            <p>Escaneie o QR code abaixo e faça o pagamento.</p>
            <BsQrCode size={150} />
            <p>A confirmação será automática e instantânea após a verificação do pagamento.</p>
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

    return (
    <div id="payment">
        <select id='type-payment' onChange={(event) => handleSelectPayment(event)}>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
            <option value="pix">Pix</option>
        </select>
        {chooseTypePayment()}
    </div>
    );
};

export default PaymentType;