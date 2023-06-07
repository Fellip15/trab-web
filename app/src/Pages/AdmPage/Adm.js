import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Adm.css"

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AdmItemList from '../../Components/Adm/AdmItemList';
import { useCookies } from "react-cookie";

const Adm = ({ dataItens, setItems, remItem }) => {

    const [cookies, setCookies, removeCookies] = useCookies(['user', 'admin']);
    useEffect(() => {
        if (!(cookies.user && cookies.admin && cookies.admin === '1'))
            navigate('/login', {state: {errorMessage: 'É preciso logar como Admin para acessar'}});
    }, []);

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
            {dataItens !== undefined && <AdmItemList dataItens={dataItens} remItem={remItem}/>}
        </div>
        
        <Footer />
        </>
    );
};

export default Adm;