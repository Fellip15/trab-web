import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./UserDelete.css"

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import AdmItemList from '../../Components/Adm/AdmItemList';
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Message from "../../Components/Message";
import axios from "axios";
import { baseURL } from "../../config";
import AdmUserList from "../../Components/Adm/AdmUserList";

const Adm = () => {
    const locate = useLocation();

    const [cookies, setCookies, removeCookies] = useCookies(['user', 'admin']);
    const [ fetched, setFetched ] = useState(false);
    const [ dataUser, setDataUser ] = useState(false);
    useEffect(() => {

        async function redirectAdmin() {
            if(cookies.user !== undefined) {
                const res = await axios.get(baseURL + "/isAdmin/" + cookies.user);

                if(res.data.isAdmin === undefined || res.data.isAdmin === false) {
                    navigate('/login', {state: {errorMessage: 'É preciso logar como Admin para acessar'}});
                    return;
                }
            } else {
                navigate('/login', {state: {errorMessage: 'É preciso logar como Admin para acessar'}});
                return;
            }
        }
        redirectAdmin();
    
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
            axios.get(baseURL + "/users")
            .then((res) => {
                console.log(res.data);
                setDataUser(res.data);
                setFetched(true);
            })
            .catch((e) => {
                toast.error(e.response.data.message);
            })
        }
    }, []);

    const remUser = async (id) => {
        axios.delete(baseURL + "/users/" + id)
        .then((res) => {
            toast.success(res.data.message);
            const newDataItens = dataUser.filter((card) => String(card.user._id) !== String(id));
            setDataUser([...newDataItens]);
        })
        .catch((e) => {
            toast.error(e.response.data.message);
        });
    };

    // direciona o usuário à tela de adicionar um novo item
    const navigate = useNavigate();

    return (
        <>
        <Message />
        <Header/>

        <div className="container-adm content">
            <h1>Remover usuário:</h1>
            {fetched && <AdmUserList dataUsers={dataUser} remUser={remUser} />}
        </div>
        
        <Footer />
        </>
    );
};

export default Adm;