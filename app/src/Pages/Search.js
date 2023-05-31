import React from 'react';
import {useParams} from 'react-router-dom';
import "./css/Search.css";

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SearchItens from '../Components/Search/Itens';

const Search = ({ dataItens }) => {
    // pega e trata os parâmetros da url (nome de busca)
    const params = useParams();
    const nameFind = params.itemName;

    return (
        <>
            <Header />

            <div className="container-search content">
                <h1>Buscando por: {nameFind}</h1>
                {dataItens !== undefined && <SearchItens dataItens={dataItens} nameSearch={nameFind}/>}
            </div>
            
            <Footer />
        </>
    );
};

export default Search;