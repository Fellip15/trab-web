// const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/User");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_ERROR = 400;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports.create = async (req, res) => {
    try {
        const newUser = new User({
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();
        res.status(STATUS_CODE_OK).json({ message: "Usuário salvo com sucesso!" });
    } catch (err) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao salvar o usuário." });
    }
};

exports.remove = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user)
            return res.status(STATUS_CODE_NO_CONTENT).json({ message: "Usuário não encontrado." });

        await user.deleteOne();
        res.status(STATUS_CODE_DELETE_ACCEPTED).json({ message: "Usuário removido com sucesso." });
    } catch (err) {
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao remover o usuário." });
    }
};

module.exports.update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        });
        res.status(STATUS_CODE_OK).json({ message: "Usuário atualizado com sucesso." });
    } catch (err) {
        res.status(STATUS_CODE_ERROR).json({ message: "Erro ao atualizar o usuário." });;
    }
};

module.exports.findAll = async (req, res) => {
    try {
        const data = await User.find();
        res.status(STATUS_CODE_OK).send(data);
    } catch (err) {
        res.status(STATUS_CODE_ERROR).json({ message: "Erro ao buscar os usuários." });;
    }
};

module.exports.findByEmail = async (req, res) => {
    try {
        const data = await User.find({
            email: req.params.email
        });
        res.status(STATUS_CODE_OK).send(data);
    } catch (err) {
        res.status(STATUS_CODE_ERROR).json({ message: "Erro ao buscar o usuário." });;
    }
};

module.exports.findByUserName = async (req, res) => {
    try {
        const data = await User.find({
            userName: req.params.userName
        });
        res.status(STATUS_CODE_OK).send(data);
    } catch (err) {
        res.status(STATUS_CODE_ERROR).json({ message: "Erro ao buscar o usuário." });;
    }
};