import React, { useState } from 'react';
import HomeItem from './HomeItem';
import './HomeItemList.css';

const HomeItemList = ({ dataItens, title }) => {
    return (
        <div className="table-itens">
            <h1 className="font-title-black">{title}</h1>
            <div className="itens">
                {dataItens.map(item => 
                    <HomeItem key={item.id} dataItem={item} />
                )}
            </div>
        </div>
    );
};

export default HomeItemList;