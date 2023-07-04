import React from 'react';
import { MdCancel } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import './AdmUser.css';
import { baseURL } from '../../config';

const AdmUser = ({ card, remUser }) => {

    // remove o ítem selecionado
    const handleRemUser = () => {
        if (window.confirm(`Deseja apagar o ítem "${card.user.userName}" do banco?`) === true)
            remUser(card.user._id);
    };

    return (
        <div className="adm-user">
            <div className='icon-user'>
                {card.user.admin && <RiAdminFill size={50} />}
                {!card.user.admin && card.image === undefined && <AiOutlineUser size={50} />}
                {!card.user.admin && card.image !== undefined && <img className='image-user-adm' src={baseURL + "/" + card.image} alt="not found" />}
            </div>
            <div className="content-info-adm">
                <div className="info-user-adm">
                    <p className="user-adm-name">User: {card.user.userName}</p>
                    <p className="user-adm-price font-inter-strong">Email: {card.user.email}</p>
                </div>
            </div>
            <div className="buttons-adm-user">
                <div className="button-adm">
                    <MdCancel className="icon-adm icon-red" onClick={handleRemUser}/>
                </div>
            </div>
        </div>
    );
};

export default AdmUser;