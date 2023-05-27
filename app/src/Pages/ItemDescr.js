import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import './css/ItemDescr.css';

const ItemDescr = ({ dataItens }) => {
    // pega e trata os parâmetros da url (id do ítem)
    const params = useParams();
    const itemId = params.itemId;

    // atualiza a variável do ítem escolhido de acordo com o banco e o id
    const [dataItem, setDataItem] = useState(undefined);
    useEffect(() => {
        // verifica se os dados dos ítens já existem
        if (dataItens !== undefined) {
            setDataItem(dataItens.filter(item => item.id == itemId)[0]);
        }
        // caso contrário, busca no banco antes de fazer a filtragem    
        else {
            fetch('../data/itens.json')
                .then(data => data.json())
                .then(jsonData => setDataItem(jsonData.array.filter(item => item.id == itemId)[0]));
        }
    }, [dataItens, itemId]);

    return (
        dataItem !== undefined && <>
        <Header adjustPath={'../'}/>
        
        <div className="screen-item">
            <div className="data-item">
                <div className="imgs-item">
                    <div className="sub-imgs-item">

                    </div>
                    <div className="current-image-item">

                    </div>
                </div>
                <div className="info-item">

                </div>
            </div>
            <div className="location-item">
                <iframe id="map-usp" src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14796.751198878157!2d" + dataItem.coord[0] + "!3d" + dataItem.coord[1] + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9fd71af8a6c23c26!2sUSP%20-%20Universidade%20de%20S%C3%A3o%20Paulo%20Campus%20de%20S%C3%A3o%20Carlos!5e0!3m2!1spt-BR!2sbr!4v1682962429083!5m2!1spt-BR!2sbr"} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>

        <Footer />
        </>
    );
};

export default ItemDescr;