import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import { LuEdit } from 'react-icons/lu';
import '../../root.css';
import '../css/AdmItens.css';

const AdmItem = ({ dataItem, remItem }) => {

    // remove o ítem selecionado
    const handleRemItem = () => {
        if (window.confirm(`Deseja apagar o ítem "${dataItem.name}" do banco?`) === true)
            remItem(dataItem.id);
    };

    // vai para a página de edição do ítem
    const navigate = useNavigate();
    const handleEditItem = () => {
        navigate(`/adm/edit/${dataItem.id}`);
    };

    return (
        <div className="adm-item">
            <div className="content-info-adm">
                <div className="img-item-adm">
                    <img src={dataItem.srcImage[0]} className="item-img-adm"/>
                </div>
                <div className="info-item-adm">
                    <p className="item-adm-name">{dataItem.name}</p>
                    <p className="item-adm-price font-inter-strong">R${dataItem.price.toFixed(2)}</p>
                    <p className="font-inter-black">em estoque: {dataItem.stock}</p>
                </div>
            </div>
            <div className="descr-item-adm">
                {dataItem.description}
            </div>
            <div className="buttons-adm-item">
                <MdCancel className="icon" onClick={handleRemItem}/>
                <LuEdit className="icon" onClick={handleEditItem}/>
            </div>
        </div>
    );
};

export default AdmItem;