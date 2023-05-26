import React, { useState } from 'react';
import Item from './Item';
import '../../root.css';
import '../css/HomeItens.css';

const Itens = ({ dataItens, title }) => {
    return (
        <div className="table-itens">
            <h1 className="font-title-black">{title}</h1>
            <div className="itens">
                {dataItens.map(item => 
                    <Item dataItem={item} />
                )}
            </div>
        </div>
    );
};

export default Itens;