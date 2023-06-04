import React, { useState } from 'react';
import Item from './Item';
import '../../root.css';
import '../css/AdmItens.css';

const AdmItens = ({ dataItens, remItem }) => {

    console.log(dataItens);
    return (
        <div className="list-itens-adm">
            {dataItens.map(item => 
                <Item key={item.id} dataItem={item} remItem={remItem}/>
            )}
        </div>
    );
};

export default AdmItens;