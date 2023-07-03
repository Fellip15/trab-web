import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./Adm.css"

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AdmItemList from '../../Components/Adm/AdmItemList';
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Message from "../../Components/Message";
import axios from "axios";
import { baseURL } from "../../config";

const Adm = () => {
    const locate = useLocation();

    const [cookies, setCookies, removeCookies] = useCookies(['user', 'admin']);
    const [ fetched, setFetched ] = useState(false);
    const [ dataItens, setDataItens ] = useState(false);
    useEffect(() => {
        if (!(cookies.user && cookies.admin && cookies.admin === '1'))
            navigate('/login', {state: {errorMessage: 'É preciso logar como Admin para acessar'}});

        if(cookies.admin !== null && cookies.admin !== undefined && cookies.admin === "1") {
            navigate("/adm");
        }
    
        if(locate.state && locate.state.successMessage) {
            toast.success(locate.state.successMessage);
        }
        if(locate.state && locate.state.errorMessage) {
            toast.error(locate.state.errorMessage);
        }
        if(locate.state && locate.state.infoMessage) {
            toast.info(locate.state.infoMessage);
        }
        if(locate.state && locate.state.logoutMessage) {
            toast.success(locate.state.logoutMessage);
        }

        if(!fetched) {
            axios.get(baseURL + "/cardItem")
            .then((res) => {
                console.log(res.data.cardItens);
                setDataItens(res.data.cardItens);
                console.log("Itens:");
                console.log(res.data.cardItens);
                setFetched(true);
            })
            .catch((e) => {
                toast.error(e.response.data.message);
            })
        }
    }, []);

    const remItem = async (id) => {
        axios.delete(baseURL + "/item/" + id)
        .then((res) => {
            toast.success(res.data.message);
            const newDataItens = dataItens.filter((card) => String(card.item._id) !== String(id));
            setDataItens([...newDataItens]);
        })
        .catch((e) => {
            toast.error(e.response.data.message);
        });
    };

    // direciona o usuário à tela de adicionar um novo item
    const navigate = useNavigate();
    const handleClickAddItem = () => {
        navigate('/adm/edit/newItem');
    };

    return (
        <>
        <Message />
        <Header/>

        <div className="container-adm content">
            <h1>Opções de administrador:</h1>
            <input
                onClick={handleClickAddItem}
                type="button"
                value="Adicionar item"
                className="button-add-item"
            />
            {fetched && <AdmItemList dataItens={dataItens} remItem={remItem} />}
        </div>
        
        <Footer />
        </>
    );
};

export default Adm;