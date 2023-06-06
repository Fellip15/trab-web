import React, { useState } from 'react';
import SearchItem from './SearchItem';
import '../../root.css';
import './SearchItemList.css';

const SearchItens = ({ dataItens, nameSearch }) => {
    // retorna os ítens que satisfaçam a busca
    const getItensSearch = () => {
        return dataItens.filter(item => 
            item.name.toLowerCase().includes(nameSearch.toLowerCase())
        );
    };
    console.log(getItensSearch());

    return (
        <div className="list-itens-search">
            {getItensSearch().map(item => 
                <SearchItem key={item.id} dataItem={item} />
            )}
        </div>
    );
};

export default SearchItens;