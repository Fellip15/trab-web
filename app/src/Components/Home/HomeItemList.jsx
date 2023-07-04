import React, { useState } from 'react';
import HomeItem from './HomeItem';
import './HomeItemList.css';

const HomeItemList = ({ dataItens, title }) => {
    return (
        <div className="table-itens">
            <h1 className="font-title-black">{title}</h1>
            <div className="itens">
                {dataItens.map(card => {
                    return <HomeItem key={card.item._id} cardItem={card} />
                }
                )}
            </div>
        </div>
    );
};

export default HomeItemList;