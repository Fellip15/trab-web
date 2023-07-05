const fs = require("fs");
const ImageSchema = require("../models/Image");
const sharp = require("sharp");
const { execFileSync } = require("child_process");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_ERROR = 400;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

exports.createImagesItem = async (req, res) => {
    const files = req.files;
    if(files === undefined) {
        return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao salvar a imagem." });
    }

    try {
        for(let i = 1; i < files.length; i++) {
            const fileSharp = await sharp(files[i].path);
            await fileSharp.resize({
                width: 500,
                height: 500
            });
            await fileSharp.toBuffer(function (err, buffer) {
                if(buffer === undefined) return;
                fs.writeFile(files[i].path, buffer, function (e) {

                });
            });
        }
        files.forEach((file) => {
            sharp(file.path)
                .resize({
                    width: 500,
                    height: 500
                })
                .toBuffer(function (err, buffer) {
                    if(buffer === undefined) return;
                    fs.writeFile(file.path, buffer, function (e) {
    
                    });
                });
        });
    } catch (error) {
        console.log(error);
    }

    try {
        const { name } = req.body;

        const pictures = [];
        for(let i = 0; i < files.length; i++) {
            const picture = new ImageSchema({
                name,
                src: files[i].path,
            });
    
            await picture.save();
            pictures.push(picture);
        }
        res.status(STATUS_CODE_OK).send({ message: "Imagem enviada com sucesso!", images: pictures });
    } catch (err) {
        console.log(err)
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao salvar a imagem." });
    }
};

exports.createImageUser = async (req, res) => {
    try {
        sharp(req.file.path)
            .resize({
                width: 500,
                height: 500
            })
            .toBuffer(function (err, buffer) {
                fs.writeFile(req.file.path, buffer, function (e) {

                });
            });
    } catch (error) {
        console.log(error);
    }

    try {
        const { name } = req.body;

        const file = req.file;
        const picture = new ImageSchema({
            name,
            src: file.path,
        });
        console.log(file.path);

        await picture.save();
        res.status(STATUS_CODE_OK).send({ message: "Imagem enviada com sucesso!", image: picture });
    } catch (err) {
        console.log(err)
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao salvar a imagem." });
    }
};

exports.remove = async (req, res) => {
    try {
        const picture = await ImageSchema.findById(req.params.id);

        if (!picture)
            return res.status(STATUS_CODE_NO_CONTENT).json({ message: "Imagem não encontrada" });

        await picture.deleteOne();
        fs.unlinkSync(picture.src);
        res.status(STATUS_CODE_DELETE_ACCEPTED).send({ message: "Imagem removida com sucesso" });
    } catch (err) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: "Erro ao remover a imagem" });
    }
};

exports.findAll = async (req, res) => {
    try {
        const pictures = await ImageSchema.find();
        res.status(STATUS_CODE_OK).json(pictures);
    } catch (err) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar as imagens." });
    }
};

exports.getImage = async (req, res) => {
    const id = req.params.id;
    console.log(id)

    try {
        const image = await ImageSchema.findById(id);

        res.status(STATUS_CODE_OK).send({ message: "Imagem buscada com sucesso!", image: image });
    } catch (err) {
        res.status(STATUS_CODE_ERROR).send({ message: "Usuário não possui foto!" });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const data = await ImageSchema.find();
        data.forEach(async (image) => await image.deleteOne());
        res.status(STATUS_CODE_OK).send({ message: "Todas imagens foram apagadas." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).json({
            message: "Erro ao buscar os usuários.",
            error: error
        });
    }
};