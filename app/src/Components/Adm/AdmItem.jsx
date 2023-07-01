import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import { LuEdit } from 'react-icons/lu';
import './AdmItem.css';
import { baseURL } from '../../config';

const AdmItem = ({ card, remItem }) => {

    // remove o ítem selecionado
    const handleRemItem = () => {
        if (window.confirm(`Deseja apagar o ítem "${card.name}" do banco?`) === true)
            remItem(card.item._id);
    };

    // vai para a página de edição do ítem
    const navigate = useNavigate();
    const handleEditItem = () => {
        navigate(`/adm/edit/${card.item._id}`);
    };

    const srcImage = () => {
        if(card.image === null) {
            return "";
        } 
        return baseURL + "/" + card.image;
    };

    return (
        <div className="adm-item">
            <div className="content-info-adm">
                <div className="img-item-adm">
                    <img src={srcImage()} className="item-img-adm"/>
                </div>
                <div className="info-item-adm">
                    <p className="item-adm-name">{card.item.name}</p>
                    <p className="item-adm-price font-inter-strong">R${card.item.price}</p>
                    <p className="font-inter-black">em estoque: {card.item.stock}</p>
                </div>
            </div>
            <div className="descr-item-adm">
                {card.item.description}
            </div>
            <div className="buttons-adm-item">
                <div className="button-adm">
                    <MdCancel className="icon-adm icon-red" onClick={handleRemItem}/>
                </div>
                <div className="button-adm">
                    <LuEdit className="icon-adm" onClick={handleEditItem}/>
                </div>
            </div>
        </div>
    );
};

export default AdmItem;