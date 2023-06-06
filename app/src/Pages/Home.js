import React, { useEffect } from 'react';
import "./css/Home.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Itens from "../Components/Home/Itens";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Home = ({ usersInfo, dataItens }) => {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["user", "admin"]);
    useEffect(() => {
        if(cookies.admin !== null && cookies.admin !== undefined && cookies.admin === "1") {
            navigate("/adm");
        }
    }, [])

    return (
        <>
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

            {dataItens !== undefined && <Itens dataItens={dataItens} title={'Ilhas recomendadas para você:'}/>}
        </div>
        <Footer />
        </>
    );
};

export default Home;