const fs = require("fs");
const ImageSchema = require("../models/Image");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        const file = req.file;
        console.log(name)
        const picture = new ImageSchema({
            name,
            src: file.path,
        });

        await picture.save();
        res.status(STATUS_CODE_OK).json(picture);
    } catch (err) {
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
        res.status(STATUS_CODE_DELETE_ACCEPTED).json({ message: "Imagem removida com sucesso" });
    } catch (err) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao remover a imagem" });
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
