import React from 'react';
import {useParams} from 'react-router-dom';
import "./Search.css";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchItemList from '../../Components/Search/SearchItemList';

const Search = ({ dataItens }) => {
    // pega e trata os parâmetros da url (nome de busca)
    const params = useParams();
    const nameFind = params.itemName;

    return (
        <>
            <Header />

            <div className="container-search content">
                <h1>Buscando por: {nameFind}</h1>
                {dataItens !== undefined && <SearchItemList dataItens={dataItens} nameSearch={nameFind}/>}
            </div>
            
            <Footer />
        </>
    );
};

export default Search;