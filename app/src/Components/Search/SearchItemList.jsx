import React, { useState } from 'react';
import SearchItem from './SearchItem';
import '../../root.css';
import './SearchItemList.css';

const SearchItens = ({ dataItens, nameSearch }) => {
    // retorna os ítens que satisfaçam a busca
    const getItensSearch = () => {
        return dataItens.filter(card => 
            card.item.name.toLowerCase().includes(nameSearch.toLowerCase())
        );
    };

    return (
        <div className="list-itens-search">
            {getItensSearch().map(card => 
                <SearchItem key={card.item._id} dataItem={card} />
            )}
        </div>
    );
};

export default SearchItens;