import React, { useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import "./css/Search.css";

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Itens from '../Components/Search/Itens';

const Search = ({ dataItens }) => {
    // pega e trata os parâmetros da url (título da task)
    const params = useParams();
    const nameFind = params.itemName;

    return (
        <>
        <Header adjustPath={'../'}/>

        <div className="container">
            <h1>Buscando por: {nameFind}</h1>
            {dataItens !== undefined && <Itens dataItens={dataItens} nameSearch={nameFind}/>}
        </div>
        
        <Footer />
        </>
    );
};

export default Search;