import React from 'react';
import AdmItem from './AdmItem';
import './AdmItemList.css';

const AdmItemList = ({ dataItens, remItem }) => {
    return (
        <div className="list-itens-adm">
            {dataItens.map((card) => {
                return <AdmItem key={card.item._id} card={card} remItem={remItem} />
            }
            )}
        </div>
    );
};

export default AdmItemList;