import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import "./Search.css";

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchItemList from '../../Components/Search/SearchItemList';
import axios from 'axios';
import { baseURL } from '../../config';

const Search = () => {
    // pega e trata os parâmetros da url (nome de busca)
    const params = useParams();
    const nameFind = params.itemName;

    const [ dataItens, setDataItens ] = useState(undefined);

    useEffect(() => {
        if(dataItens !== undefined) return;
        console.log("Buscando dataitens");
        console.log(dataItens);
        axios.get(baseURL + "/cardItem")
        .then((res) => {
            console.log(res.data.cardItens);
            setDataItens(res.data.cardItens);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

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