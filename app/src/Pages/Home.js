import React from 'react';
import "./css/Home.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Itens from "../Components/Home/Itens";
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Home = ({ dataItens }) => {
    const [cookies, setCookies, removeCookies] = useCookies(["user"]);

    return (
        <>
        <Header user={cookies.user} />
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