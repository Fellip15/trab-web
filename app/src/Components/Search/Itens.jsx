import React, { useState } from 'react';
import Item from './Item';
import '../../root.css';
import '../css/SearchItens.css';

const Itens = ({ dataItens, nameSearch }) => {
    // retorna os ítens que satisfaçam a busca
    const getItensSearch = () => {
        return dataItens.filter(item => 
            item.name.toLowerCase().includes(nameSearch.toLowerCase())
        );
    };
    console.log(getItensSearch());

    return (
        <div className="table-itens">
            {getItensSearch().map(item => 
                <Item dataItem={item} />
            )}
        </div>
    );
};

export default Itens;