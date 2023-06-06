import React from 'react';
import AdmItem from './AdmItem';
import './AdmItemList.css';

const AdmItemList = ({ dataItens, remItem }) => {

    console.log(dataItens);
    return (
        <div className="list-itens-adm">
            {dataItens.map(item => 
                <AdmItem key={item.id} dataItem={item} remItem={remItem}/>
            )}
        </div>
    );
};

export default AdmItemList;