import React, { useEffect, useState } from 'react';
import "./Home.css";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HomeItemList from "../../Components/Home/HomeItemList";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Message from '../../Components/Message';
import { toast } from 'react-toastify';
import { baseURL } from "../../config";
import axios from 'axios';

const Home = () => {
    const locate = useLocation();

    const [ dataItens, setDataItens ] = useState(null);
    const [ fetched, setFetched ] = useState(false);

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["user", "admin"]);
    useEffect(() => {
        async function redirectAdmin() {
            if(cookies.user === undefined) return;
            const res = await axios.get(baseURL + "/isAdmin/" + cookies.user);
            console.log(res);
            if(res.data.isAdmin !== undefined && res.data.isAdmin === true) {
                navigate("/adm");
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
        
        axios.get(baseURL + "/cardItem")
        .then((res) => {
            console.log(res.data.cardItens);
            setDataItens(res.data.cardItens);
            setFetched(true);
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        })
    }, [])

    return (
        <>
        <Message />
        <Header />
        <div className="main-page content">
            <div className="propaganda">
                <div className="frame-3">
                    <img src="img/pexels-andrea-piacquadio.png" alt="Imagem propaganda" id="img-propaganda"/>
                </div>

                <div className="frame-4">
                    <p className="font-inter-black">Porque utilizar nosso site?</p>
                    <p className="font-inter-black">O nosso site tem a proposta de facilitar a venda e compra de itens que não são encontrados em todos os lugares.
                    </p>
                </div>

                <img src="img/logo/logo-completa.png" alt="Logo" id="img-logo-propaganda"/>
            </div>

            {fetched && <HomeItemList dataItens={dataItens} title={'Produtos recomendados para você:'}/>}
        </div>
        <Footer />
        </>
    );
};

export default Home;