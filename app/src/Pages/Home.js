import React, { useState } from 'react';
import "./css/Home.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Itens from "../Components/Itens";

// import 'bootstrap/dist/css/bootstrap.css';
// import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    // lista de ítens para teste (é necessário adicionar mais campos para funcionar em outros testes, como descrição)
    const itensTest = [
        {id: 0, name: 'Ilha Osasco', price: 9011.9, srcImage: './img/produtos/ilha1.png'},
        {id: 1, name: 'Apt bom', price: 5555, srcImage: './img/produtos/apt2.png'},
        {id: 2, name: 'Apt ótimo', price: 123444.9, srcImage: './img/produtos/apt3.png'},
        {id: 3, name: 'ICMC', price: 789.23, srcImage: './img/produtos/apt2.png'},
        {id: 4, name: 'Ilha Osasco', price: 9011.9, srcImage: './img/produtos/ilha1.png'},
        {id: 5, name: 'Apt bom', price: 5555, srcImage: './img/produtos/apt2.png'},
        {id: 6, name: 'Apt ótimo', price: 123444.9, srcImage: './img/produtos/apt3.png'},
        {id: 7, name: 'ICMC', price: 789.23, srcImage: './img/produtos/apt2.png'},
        {id: 8, name: 'Ilha Osasco', price: 9011.9, srcImage: './img/produtos/ilha1.png'},
        {id: 9, name: 'Apt bom', price: 5555, srcImage: './img/produtos/apt2.png'},
        {id: 10, name: 'Apt ótimo', price: 123444.9, srcImage: './img/produtos/apt3.png'},
        {id: 11, name: 'ICMC', price: 789.23, srcImage: './img/produtos/apt2.png'},
    ];
    
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

            <Itens dataItens={itensTest} title={'Ilhas recomendadas para você:'}/>
        </div>
        <Footer />
        </>
    );
};

export default Home;