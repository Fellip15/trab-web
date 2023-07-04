import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const baseURL = "http://localhost:5300";

export const authToken = async (userCookie, callbackSucess, callbackError) => {
    await axios.post(baseURL + "/users/token", {
        token: userCookie
    })
    .then(callbackSucess)
    .catch(callbackError);
};

// máscara de formatação de inputs
export const telMask = (value) => {
    if (value === undefined || value === null) return null;
    const numericValue = String(value).replace(/\D/g, '');
    
    let maskedValue = '';
    if (numericValue.length <= 2) {
        maskedValue = `(${numericValue}`;
    } else if (numericValue.length <= 6) {
        maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
    } else if (numericValue.length <= 10) {
        maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 6)}-${numericValue.slice(6)}`;
    } else {
        maskedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
    }

    return maskedValue;
};

export const cpfMask = (value) => {
    if (value === undefined || value === null) return null;
    const numericValue = String(value).replace(/\D/g, '');
    
    let maskedValue = '';
    if (numericValue.length <= 3) {
        maskedValue = numericValue;
    } else if (numericValue.length <= 6) {
        maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    } else if (numericValue.length <= 9) {
        maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
    } else {
        maskedValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
    }

    return maskedValue;
};

export const cepMask = (value) => {
    if (value === undefined || value === null) return null;
    const numericValue = String(value).replace(/\D/g, '');

    let maskedValue = '';
    if (numericValue.length <= 5) {
        maskedValue = numericValue;
    } else if (numericValue.length <= 8) {
        maskedValue = `${numericValue.slice(0, 5)}-${numericValue.slice(5)}`;
    } else {
        maskedValue = `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
    }

    return maskedValue;
};

export const numCartMask = (value) => {
    if (value === undefined || value === null) return null;
    const numericValue = String(value).replace(/\D/g, '');
    
    let maskedValue = '';
    if (numericValue.length <= 16) {
        maskedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    else {
        maskedValue = numericValue.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    return maskedValue;
};