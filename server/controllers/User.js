const util = require("../config/util");
const fs = require("fs");
const UserSchema = require("../models/User");
const ImageSchema = require("../models/Image");
const bcrypt = require("bcrypt");
const utilToken = require("../config/utilToken");

const STATUS_CODE_OK = 200;
const STATUS_CODE_NO_CONTENT = 204;
const STATUS_CODE_DELETE_ACCEPTED = 202;
const STATUS_CODE_ERROR = 400;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

exports.authToken = async (req, res) => {
    const token = req.body.token;

    if (util.isEmpty(token)) 
        return res.status(STATUS_CODE_ERROR).send({ message: "Não autorizado!" });

    try {
        const Token = await utilToken.verify(token);
        const user = await UserSchema.findById(Token.id);

        res.status(STATUS_CODE_OK).send({
            message: "Token verificado!",
            user: {
                _id: user._id,
                userName: user.userName,
                name: user.name,
                email: user.email,
                tel: user.tel,
                cpf: user.cpf,
                image: user.image,
                end_street: user.end_street,
                end_num: user.end_num,
                end_neighborhood: user.end_neighborhood,
                end_cep: user.end_cep
            }
        });
    } catch (error) {
        console.log(error)
        res.status(STATUS_CODE_ERROR).send({ 
            message: "Não autorizado!",
            error: error
        });
    }
};

exports.authUser = async (req, res) => {
    const { userName, password } = req.body;
    
    if(util.isEmpty(userName) || util.isEmpty(password)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }
    let user = null;
    
    try {
        if(userName.includes("@")) user = await UserSchema.findOne({ email: userName });
        else user = await UserSchema.findOne({ userName: userName });
    } catch(e) {
        console.log(e);
        return res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({ message: "Erro ao fazer login." });
    }

    if(!util.isEmpty(user) && (await user.matchPassword(password))) {
        const token = utilToken.generate(user._id);
        res.cookie("token", token);
        
        res.status(STATUS_CODE_OK).send({ 
            message: "Logado com sucesso.",
            user: user,
            token: token
        });
    } else {
        res.status(STATUS_CODE_ERROR).send({ message: "Usuário ou senha incorretos." });
    }
};

const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

exports.create = async (req, res) => {
    console.log(req.body)
    const { userName, name, email, password, confirmPassword } = req.body;

    if(util.isEmpty(userName) || util.isEmpty(name) || util.isEmpty(email) || util.isEmpty(password) || util.isEmpty(confirmPassword)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }
    
    if(!validateEmail(email)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "O email não está no formato correto." });
    }
    
    if(password !== confirmPassword) {
        return res.status(STATUS_CODE_ERROR).send({ message: "A senha e a senha de confirmação são diferentes." });
    }

    const userExist = await UserSchema.findOne({$or:[{userName: userName},{email:email}]});
    if(!util.isEmpty(userExist))
        return res.status(STATUS_CODE_ERROR).send({ message: "Usuário ou email já existente." });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserSchema({
        userName: userName,
        name: name,
        email: email,
        password: encryptedPassword
    });

    try {
        await newUser.save();

        const token = utilToken.generate(newUser._id);
        res.cookie("token", token);

        res.status(STATUS_CODE_OK).json({ 
            message: "Usuário salvo com sucesso!",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
            message: "Erro ao salvar o usuário.",
            error: error
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id);

        if (!user)
            return res.status(STATUS_CODE_NO_CONTENT).json({ message: "Usuário não encontrado." });

        await user.deleteOne();
        res.status(STATUS_CODE_DELETE_ACCEPTED).json({ message: "Usuário removido com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
            message: "Erro ao remover o usuário.",
            error: error
        });
    }
};

exports.update = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await UserSchema.findByIdAndUpdate(req.params.id, {
            $set: {
                userName: req.body.userName,
                name: req.body.name,
                email: req.body.email,
                password: encryptedPassword,
            }
        });
        res.status(STATUS_CODE_OK).json({ message: "Usuário atualizado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).json({
            message: "Erro ao atualizar o usuário.",
            error: error
        });
    }
};

exports.updatePers = async (req, res) => {
    try {
        await UserSchema.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                tel: req.body.tel,
                cpf: req.body.cpf
            }
        });
        res.status(STATUS_CODE_OK).json({ message: "Dados pessoais atualizados com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).json({
            message: "Erro ao atualizar o usuário.",
            error: error
        });
    }
};

exports.updateEnd = async (req, res) => {
    try {
        await UserSchema.findByIdAndUpdate(req.params.id, {
            $set: {
                end_street: req.body.street,
                end_num: req.body.num,
                end_neighborhood: req.body.neighborhood,
                end_cep: req.body.cep
            }
        });
        res.status(STATUS_CODE_OK).json({ message: "Endereço atualizado com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).json({
            message: "Erro ao atualizar o usuário.",
            error: error
        });;
    }
};

exports.updateImage = async (req, res) => {
    const { idUser, idImage } = req.body;
    console.log(idUser, idImage)
    let user = await UserSchema.findById(idUser);
    
    console.log(user);
    if(user === null)
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar o usuário" });
    
    const oldImage = await ImageSchema.findById(user.image);
    console.log(oldImage)
    if(oldImage !== null) {
        fs.unlinkSync(oldImage.src);
        oldImage.deleteOne();
    }

    const newImage = await ImageSchema.findById(idImage);
    console.log(newImage);
    try {
        await UserSchema.findByIdAndUpdate(idUser, {
            image: newImage._id
        })

        res.status(STATUS_CODE_OK).send({ message: "Imagem linkada com o usuário com sucesso!", image: newImage });
    } catch(e) {
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a nova imagem" });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await UserSchema.find();
        res.status(STATUS_CODE_OK).send(data);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os usuários.",
            error: error
        });
    }
};

exports.findByEmail = async (req, res) => {
    try {
        const data = await UserSchema.find({
            email: req.params.email
        });
        res.status(STATUS_CODE_OK).send(data);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar o usuário.",
            error: error
        });
    }
};

exports.findByUserName = async (req, res) => {
    try {
        const data = await UserSchema.find({
            userName: req.params.userName
        });
        res.status(STATUS_CODE_OK).send(data);
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar o usuário.",
            error: error
        });
    }
};

exports.clearUsers = async (req, res) => {
    console.log("Deletando tudo")
    try {
        const data = await UserSchema.find();
        data.forEach(async (user) => await user.deleteOne());
        res.status(STATUS_CODE_OK).send({ message: "Todos os usuários foram apagados."});
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).send({
            message: "Erro ao buscar os usuários.",
            error: error
        });
    }
};