const util = require("../config/util");
const ItemSchema = require("../models/Item");
const ImageSchema = require("../models/Image");
const fs = require("fs");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_ERROR = 400;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

exports.create = async (req, res) => {
    const { name, price, numParc, images, stock, sold, latitude, longitude, description } = req.body;

    if (util.isEmpty(name) || util.isEmpty(price) || util.isEmpty(latitude) || util.isEmpty(longitude)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }
    const newItem = new ItemSchema({
        name: name,
        price: price,
        numParc: numParc,
        images: images,
        stock: stock,
        sold: sold,
        latitude: latitude,
        longitude: longitude,
        description: description
    });

    try {
        await newItem.save();

        res.status(STATUS_CODE_OK).json({
            message: "Item salvo com sucesso!",
            item: newItem
        });
    } catch (error) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
            message: "Erro ao salvar o item.",
            error: error
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const item = await ItemSchema.findById(req.params.id);

        if (!item)
            return res.status(STATUS_CODE_NO_CONTENT).send({ message: "Item não encontrado." });
        
        item.images.forEach(async (imageId) => {
            const image = await ImageSchema.findById(imageId);
            try {
                fs.unlinkSync(image.src);
                image.deleteOne();
            } catch(e) {
                console.log(e);
            }
        });

        await item.deleteOne();
        res.status(STATUS_CODE_DELETE_ACCEPTED).send({ message: "Item removido com sucesso." });
    } catch (error) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({
            message: "Erro ao remover o item.",
            error: error
        });
    }
};

exports.update = async (req, res) => {
    const { name, price, numParc, images, stock, sold, latitude, longitude, description } = req.body;
    
    if (util.isEmpty(name) || util.isEmpty(price) || util.isEmpty(latitude) || util.isEmpty(longitude)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }

    const itemToUpdate = {};
    if(!util.isEmpty(name)) itemToUpdate.name = name;
    if(!util.isEmpty(price)) itemToUpdate.price = price;
    if(!util.isEmpty(numParc)) itemToUpdate.numParc = numParc;
    if(!util.isEmpty(images)) itemToUpdate.images = images;
    if(!util.isEmpty(stock)) itemToUpdate.stock = stock;
    if(!util.isEmpty(sold)) itemToUpdate.sold = sold;
    if(!util.isEmpty(latitude)) itemToUpdate.latitude = latitude;
    if(!util.isEmpty(longitude)) itemToUpdate.longitude = longitude;
    if(!util.isEmpty(description)) itemToUpdate.description = description;
    
    try {
        await ItemSchema.findByIdAndUpdate(req.params.id, {
            $set: itemToUpdate
        });
        res.status(STATUS_CODE_OK).send({ message: "Item atualizado com sucesso." });
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao atualizar o item.",
            error: error
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await ItemSchema.find();
        res.status(STATUS_CODE_OK).send(data);
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.findAllToCard = async (req, res) => {
    try {
        const data = await ItemSchema.find();
        const cardItens = [];
        for(let i = 0; i < data.length; i++) {
            let item = data[i];
            if(item.images.length <= 0) {
                item.mainImage = null;
                cardItens.push({image: null, item: item});
            } else {
                const mainImage = await ImageSchema.findById(item.images[0]._id);
                if(mainImage !== null) {
                    cardItens.push({image: mainImage.src, item: item});
                } else {
                    cardItens.push({image: null, item: item});
                }
            }
        }
        res.status(STATUS_CODE_OK).send({ message: "Itens buscados com sucesso", cardItens: cardItens});
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const data = await ItemSchema.findById(req.params.id);
        res.status(STATUS_CODE_OK).send({message:"Item buscado com sucesso!", item:data});
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.clearItems = async (req, res) => {
    try {
        const data = await ItemSchema.find();
        data.forEach(async (item) => await item.deleteOne());
        res.status(STATUS_CODE_OK).send({ message: "Todos os itens foram apagados." });
    } catch (error) {
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os itens.",
            error: error
        });
    }
};

exports.updateImage = async (req, res) => {
    const { idItem, idImages } = req.body;
    let item = await ItemSchema.findById(idItem);

    if(item === null)
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar o item!" });

    try {
        let newImages = [];
        for(let i = 0; i < idImages.length; i++) {
            const newImage = await ImageSchema.findById(idImages[i]);
            if(newImage === null) {
                return res.status(STATUS_CODE_ERROR).send({ message: `Não foi possível achar a nova imagem no index ${i}` });
            }
            newImages.push(newImage._id);
        }
        await ItemSchema.findByIdAndUpdate(idItem, {
            images: item.images.concat(newImages)
        })
        
        res.status(STATUS_CODE_OK).send({ message: "Imagens linkadas com o usuário com sucesso!", images: newImages });
    } catch(e) {
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a nova imagem" });
    }
};

const asyncFilter = async (arr, predicate) => {
	const results = await Promise.all(arr.map(predicate));

	return arr.filter((_v, index) => results[index]);
}

exports.deleteImage = async (req, res) => {
    const { idItem, idImage } = req.body;
    let item = await ItemSchema.findById(idItem);
    
    if(item === null)
        return res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar o item!" });

    try {
        const imageToDelete = await ImageSchema.findById(idImage);
        if(imageToDelete === null) {
            return res.status(STATUS_CODE_ERROR).send({ message: `Não foi possível achar a imagem` });
        }

        fs.unlinkSync(imageToDelete.src);
        imageToDelete.deleteOne();

        let newImages = await asyncFilter(item.images, (image) => String(image) !== String(imageToDelete._id));

        await item.updateOne({images: newImages});
        
        res.status(STATUS_CODE_OK).send({ message: "Imagem deletada com sucesso!", image: idImage });
    } catch(e) {
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a imagem" });
    }
};

exports.buyItens = async (req, res) => {
    const { itensToBuy } = req.body;
    if(util.isEmpty(itensToBuy) || Object.keys(itensToBuy).length <= 0) 
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });

    let message = "";

    for(let idItem of Object.keys(itensToBuy)) {
        const amount = Number(itensToBuy[idItem]);
        const item = await ItemSchema.findById(idItem);
        if(item === null || amount === null) {
            res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível comprar o item de id: " + idItem + " com a qtd: " + amount });
            return;
        }
        
        if(Number(item.stock) < amount) {
            res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível comprar o item de id: " + idItem + " com a qtd: " + amount + " com o stoque de " + item.stock });
            return;
        }

        const newStock = Number(item.stock) - amount;
        const newSold = Number(item.sold) + amount;

        await item.updateOne({
            stock: newStock,
            sold: newSold
        });
        message += "O item " + item.name + " foi comprado com sucesso";
    }

    
    res.status(STATUS_CODE_OK).send({ message: message });
};