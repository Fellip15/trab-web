import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './EditItem.css';
import axios from "axios";
import { baseURL } from '../../config';
import Message from "../../Components/Message";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const EditItem = ({ dataItens, setItems }) => {
    const params = useParams();

    // pega e trata os parâmetros da url (id do ítem)
    const [itemId, setItemId] = useState({});
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [numParc, setNumParc] = useState("");
    const [images, setImages] = useState([]);
    const [currImages, setCurrImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);
    const [stock, setStock] = useState("");
    const [sold, setSold] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [ storageImages, setStorageImages ] = useState([]);

    const [ fetched, setFetched ] = useState(false);

    const refInputFile = useRef(null);

    const setEditingItem = async (item) => {
        setName(item.name);
        setPrice(item.price);
        setNumParc(item.numParc);
        setStock(item.stock);
        setSold(item.sold);
        setLatitude(item.latitude);
        setLongitude(item.longitude);
        setDescription(item.description);
        
        const imagesStorage = [];
        for(let i = 0; i < item.images.length; i++) {
            await axios.get(baseURL + "/image/" + item.images[i])
            .then((res) => {
                imagesStorage.push(res.data.image);
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data.message);
            });
        }
        setStorageImages([...imagesStorage]);
    }

    useEffect(() => {
        if (images.length < 1) {
            setImagesURLs([]);
        }
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);
    }, [images]);

    useEffect(() => {
        const itemIdParam = params.itemId;
        setItemId(itemIdParam);
        if(itemIdParam === "newItem") {
            setFetched(true);
        }

        if(fetched || itemIdParam === "newItem") return;

        axios.get(baseURL + "/item/" + itemIdParam)
        .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            setEditingItem(res.data.item);
            setFetched(true);
        })
        .catch((e) => {
            console.log(e);
            if(e !== undefined) {
                toast.error(e.response.data.message);
            }
        });
    }, [])

    const handleSetImage = (e) => {
        setCurrImages([...e.target.files]);
    };
    const handleAddImage = (e) => {
        e.preventDefault();
        console.log([...images, ...currImages]);
        setImages([...images, ...currImages]);
        const newImageUrls = [];
        images.forEach((image, index) => newImageUrls[index] = URL.createObjectURL(image));
        setImagesURLs(newImageUrls);
    };
    const removeImage = async (index) => {
        const newImages = images.filter((image, i) => i !== index);

        setImages([...newImages]);
    };

    const saveItem = async (event) => {
        let item = undefined;
        await axios({
            method: "post",
            url: baseURL + "/item",
            data: {
                name: name,
                price: price,
                numParc: numParc,
                stock: stock,
                sold: sold,
                latitude: latitude,
                longitude:longitude,
                description: description
            }
        })
        .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            item = res.data.item;
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        });

        if(item !== undefined) {
            const formData = new FormData();
            formData.append("name", "image " + name);
            images.forEach((images) => formData.append("file", images));
            console.log("Salvando as imagens");
            console.log(images);
            
            let imagesStorage = undefined;
            await axios({
                method: "post",
                url: baseURL + "/image/item",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((res) => {
                console.log(res.data);
                toast.success(res.data.message);
                imagesStorage = res.data.images;
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data.message);
            });

            if(imagesStorage !== undefined) {
                await axios({
                    method: "put",
                    url: baseURL + "/itemImage",
                    data: {
                        idItem: item._id,
                        idImages: imagesStorage.map((image) => image._id)
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    navigate("/adm", { state: { successMessage: res.data.message}});
                })
                .catch((e) => {
                    console.log(e);
                    toast.error(e.response.data.message);
                });
            }
        }
    }

    const editItem = async () => {
        await axios.put(baseURL + "/item/" + itemId, {
            name: name,
            price: price,
            numParc: numParc,
            stock: stock,
            sold: sold,
            latitude: latitude,
            longitude:longitude,
            description: description
        })
        .then((res) => {
            toast.success(res.data.message);
        })
        .catch((e) => {
            toast.error(e.response.data.message);
        });

        if(images.length <= 0) {
            navigate("/adm", { state: { successMessage: "Item salvo com sucesso!"}});
            return;
        }

        const formData = new FormData();
        formData.append("name", "image " + name);
        images.forEach((images) => formData.append("file", images));
        
        let imagesStorage = undefined;
        await axios({
            method: "post",
            url: baseURL + "/image/item",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then((res) => {
            console.log(res.data);
            toast.success(res.data.message);
            imagesStorage = res.data.images;
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        });

        if(imagesStorage !== undefined) {
            await axios({
                method: "put",
                url: baseURL + "/itemImage",
                data: {
                    idItem: itemId,
                    idImages: imagesStorage.map((image) => image._id)
                }
            })
            .then((res) => {
                console.log(res.data);
                navigate("/adm", { state: { successMessage: res.data.message}})
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.response.data.message);
            });
        } else {
            navigate("/adm", { state: { successMessage: "Item salvo com sucesso."}});
        }
    };

    function redirectToAdm(e) {
        navigate('/adm')
    }

    const handleSetValue = (value, setValue, type) => {
        console.log(value)
        let valueFormatted = value;
        if(type === "price") {
            valueFormatted = valueFormatted.replace(/[^0-9.,]/g, "").replace(/-/g, "");;
            console.log(valueFormatted)
        } else if(type === "natural") {
            valueFormatted = valueFormatted.replace(/[^0-9]/g, "");
        }
        setValue(valueFormatted);
    };

    const preventHiffen = (e, type) => {
        if(e.key === "-" || e.key === "+") e.preventDefault();
        if(type === "natural" && (e.key === "." || e.key === ",")) e.preventDefault();
    };

    function handleEditItem(e) {
        e.preventDefault();

        if (itemId == 'newItem') {
            saveItem();
        }
        else {
            editItem();
        }
    }

    const removeImageStorage = (id) => {
        axios({
            method: "delete",
            url: baseURL + "/deleteImageItem",
            data: {
                idItem: itemId,
                idImage: id
            }
        }) 
        .then((res) => {
            toast.success(res.data.message);
            const newStorageImages = storageImages.filter((image) => String(image._id) !== String(id));
            console.log(newStorageImages);
            setStorageImages([...newStorageImages])
        })
        .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
        })
    }

    return (
        fetched && <>
            <Header />
            <Message />
            <div className="content">
                <div className="forms-row">
                    <h2 className="forms-title">{itemId == "newItem" ? "Adicionar Item" : "Alterar Item"}</h2>
                </div>
                <div className="screen-edit-item">
                    <form className="form-edit">
                        <div className="submit-img-container">
                            <div className="submit-img-item">
                                <input className="input-file-item" ref={refInputFile} type="file" onChange={handleSetImage} multiple />
                                <input className="submit-file-item" type="submit" value="Upload imagem" onClick={handleAddImage}/>
                            </div>
                            <div className="list-images">
                                {imagesURLs.map((imageSrc, index) => (
                                    <div className="img-item-edit">
                                        <img key={index} src={imageSrc} alt="not found" width={"100px"} />
                                        <AiFillDelete className="delete-img-item" onClick={() => removeImage(index)} />
                                    </div>
                                ))}
                            </div>
                            <p>Imagens que o item já possui:</p>
                            <div className="list-images">
                                {storageImages.map((image) => {
                                    return(
                                    <div className="img-item-edit">
                                        <img key={image._id} src={baseURL + "/" + image.src} alt="not found" width={"100px"} />
                                        <AiFillDelete className="delete-img-item" onClick={() => removeImageStorage(image._id)} />
                                    </div>
                                )})}
                            </div>
                        </div>

                        <div className="forms-col">
                            <div className="forms-row">
                                <label>Nome:</label>
                                <input type="text" id="name_input" value={name} onChange={(e) => handleSetValue(e.target.value, setName)} />
                            </div>

                            <div className="forms-row">
                                <label>Preço:</label>
                                <input type="number" id="price_input" value={price} onKeyDown={(e) => preventHiffen(e, "price")} onChange={(e) => handleSetValue(e.target.value, setPrice, "price")} />
                            </div>

                            <div className="forms-row">
                                <label>Num parcelas:</label>
                                <input type="number" id="num_parcelas_input" value={numParc} onKeyDown={(e) => preventHiffen(e, "natural")} onChange={(e) => handleSetValue(e.target.value, setNumParc, "natural")} />
                            </div>

                            <div className="forms-row">
                                <label>Descrição:</label>
                                <textarea type="text" id="description_input" value={description} onChange={(e) => handleSetValue(e.target.value, setDescription)} />
                            </div>

                            <div className="forms-row">
                                <label>Estoque:</label>
                                <input type="number" id="stock_input" value={stock} onKeyDown={(e) => preventHiffen(e, "natural")} onChange={(e) => handleSetValue(e.target.value, setStock, "natural")} />

                                <label>Vendidos:</label>
                                <input type="number" id="sold_input" value={sold} onKeyDown={(e) => preventHiffen(e, "natural")} onChange={(e) => handleSetValue(e.target.value, setSold, "natural")} />
                            </div>

                            <br />
                            <h3>Coordenadas</h3>
                            <div className="forms-row">
                                <label>Latitude:</label>
                                <input type="number" id="lat_input" value={latitude} onChange={(e) => handleSetValue(e.target.value, setLatitude)} />

                                <label>Longitude:</label>
                                <input type="number" id="long_input" value={longitude} onChange={(e) => handleSetValue(e.target.value, setLongitude)} />
                            </div>
                        </div>
                    </form>
                    <div className="buttons-edit">
                        <button class="submit-button" role="button" id="cancelar-button" onClick={(e) => redirectToAdm(e)}>Cancelar</button>
                        <button class="submit-button" role="button" id="salvar-button" onClick={(e) => handleEditItem(e)}>Salvar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditItem;