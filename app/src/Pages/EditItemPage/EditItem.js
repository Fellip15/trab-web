import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './EditItem.css';

const EditItem = ({ dataItens, setItems}) => {
    const params = useParams();
    const itemId = params.itemId;

    // pega e trata os parâmetros da url (id do ítem)
    const [editingItem, setEditingItem] = useState({});
    const navigate = useNavigate();

    console.log(Object.keys(editingItem).length);
    if (Object.keys(editingItem).length == 0) {
        console.log("my id", itemId);
        if (itemId == 'newItem'){
            setEditingItem(
                {
                    "id": dataItens.length, 
                    "name": "", 
                    "price": 0, 
                    "numParc": 0, 
                    "priceParc": 0, 
                    "srcImage": [""], 
                    "stock": 0, 
                    "sold": 0, 
                    "coord":[0, 0], 
                    "description": ""
                });
        }
        else if (itemId in dataItens) {
            console.log("setting", dataItens[itemId])
            setEditingItem(dataItens[itemId]);
        }
        else {
            return (
                <>
                <Header/>
    
                <h1>
                    Item Invalido
                </h1>
                <Footer />
                </>
            );
        }
    }

    function redirectToAdm(e) {
        navigate('/adm')
    }

    function handleEditItem(e) {
        e.preventDefault();
        let newObject = 
        {
            "id" : document.getElementById("name_input").value,
            "name" : document.getElementById("name_input").value,
            "price" : Number.parseFloat(document.getElementById("price_input").value),
            "numParc" : Number.parseFloat(document.getElementById("num_parcelas_input").value),
            "priceParc" : Number.parseFloat(document.getElementById("preco_parcelas_input").value),
            "description" : document.getElementById("description_input").value,
            "stock" : Number.parseFloat(document.getElementById("stock_input").value),
            "sold" : Number.parseFloat(document.getElementById("sold_input").value),
            "coord" : [Number.parseFloat(document.getElementById("lat_input").value),
                        Number.parseFloat( document.getElementById("long_input").value)],
            "srcImage" : ['/img/produtos/apt2.png']
        }

        if (itemId == 'newItem') {
            newObject.id = dataItens.length;
            console.log([
                ...dataItens,
                newObject
            ])
            setItems([
                ...dataItens,
                newObject
            ])
            setEditingItem({});
        }
        else {
            newObject.id = itemId;
            dataItens[itemId] = newObject;
            setItems(dataItens);
        }
    }

    return (
        Object.keys(editingItem).length !== 0 && <>
        <Header/>
        
        <div className="mother-container">
        <div className="screen-edit-item content">
            <form>
                <div className="forms-col">
                    <div className="forms-row">
                        <h2 className="forms-title">{itemId=="newItem" ? "Adicionar Item" : "Alterar Item"}</h2>
                    </div>
                        
                    <div className="forms-row">
                        <label>Nome: </label>
                        <input type="text" id="name_input" defaultValue={editingItem.name}/>
                    </div>

                    <div className="forms-row">
                        <label>Preço: </label>
                        <input type="number" id="price_input" defaultValue={editingItem.price}/>
                    </div>

                    <div className="forms-row">
                        <label>Num parcelas: </label>
                        <input type="number" id="num_parcelas_input" defaultValue={editingItem.numParc}/>

                        <label>Preço Parcelas: </label>
                        <input type="number" id="preco_parcelas_input" defaultValue={editingItem.priceParc}/>
                    </div>

                    <div className="forms-row">
                        <label>Description: </label>
                        <textarea  type="text" id="description_input" defaultValue={editingItem.description}/>
                    </div>

                    <div className="forms-row">
                        <label>Estoque: </label>
                        <input type="number" id="stock_input" defaultValue={editingItem.stock}/>
                    </div>

                    <div className="forms-row">
                        <label>Vendidos: </label>
                        <input type="number" id="sold_input" defaultValue={editingItem.sold}/>
                    </div>

                    <div className="forms-row">
                        <label>Latitude: </label>
                        <input type="number" id="lat_input" defaultValue={editingItem.coord[0]}/>

                        <label>Longitude: </label>
                        <input type="number" id="long_input" defaultValue={editingItem.coord[1]}/>
                    </div>

                    

                </div>
                <div className="forms-row">
                    <button class="submit-button" role="button" id="cancelar-button" onClick={(e) => redirectToAdm(e)}>Cancelar</button>

                    <button class="submit-button" role="button" id="salvar-button" onClick={(e) => handleEditItem(e)}>Salvar</button>
                </div>
            </form>
        </div>
        </div>

        <Footer />
        </>
    );
};

export default EditItem;