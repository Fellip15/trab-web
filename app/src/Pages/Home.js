import React, { useState } from 'react';
import "./css/Home.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Itens from "../Components/Itens";

// import 'bootstrap/dist/css/bootstrap.css';
// import Carousel from 'react-bootstrap/Carousel';

const Home = ({ dataItens }) => {
    return (
        <>
        <Header />
        <div class="main-page content">
            <div class="propaganda">
                <div class="frame-3">
                    <img src="img/pexels-andrea-piacquadio.png" alt="Imagem propaganda" id="img-propaganda"/>
                </div>

                <div class="frame-4">
                    <p class="font-inter-black">Porque utilizar nosso site?</p>
                    <p class="font-inter-black">O nosso site tem a proposta de facilitar a venda e compra de itens que não são encontrados em todos os lugares.
                    </p>
                </div>

                <img src="img/logo/logo-completa.png" alt="Logo" id="img-logo-propaganda"/>
            </div>

            <Itens dataItens={dataItens} title={'Ilhas recomendadas para você:'}/>
        </div>
        <Footer />
        </>
    );
};

export default Home;