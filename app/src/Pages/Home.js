import React, { useState } from 'react';
import "./css/Home.css";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Item from "../Components/Item";

function Home() {
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

          <div class="table-itens">
                <h1 class="font-title-black">Ilhas recomendadas para você:</h1>
                <div class="itens">
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>

      </div>
      <Footer />
    </>
  );
}

export default Home;
