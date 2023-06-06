import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/Adm.css"

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AdmItens from '../Components/Adm/Itens';

const Adm = ({ dataItens, setItems, remItem }) => {

    // direciona o usuário à tela de adicionar um novo item
    const navigate = useNavigate();
    const handleClickAddItem = () => {
        navigate('/adm/edit/newItem');
    };

    return (
        <>
        <Header/>

        <div className="container-adm content">
            <h1>Opções de administrador:</h1>
            <input
                onClick={handleClickAddItem}
                type="button"
                value="Adicionar item"
                className="button-add-item"
            />
            {dataItens !== undefined && <AdmItens dataItens={dataItens} remItem={remItem}/>}
        </div>
        
        <Footer />
        </>
    );
};

export default Adm;