import React from 'react';
import AdmUser from './AdmUser';
import './AdmUserList.css';
import { RiAdminFill } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';

const AdmUserList = ({ dataUsers, remUser }) => {

    return (
        <>
            <div className='notes-user-admin'>
                <span>Usuário: <AiOutlineUser size={50} /></span>
                <span>Admin:  <RiAdminFill size={50} /></span>
            </div>
            <div className="list-users-adm">
                {dataUsers.map((card) => {
                    console.log(card)
                    return <AdmUser key={card.user._id} card={card} remUser={remUser} />
                }
                )}
            </div>
        </>
    );
};

export default AdmUserList;