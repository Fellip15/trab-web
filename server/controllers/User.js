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
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

const authToken = async (token) => {
    if (util.isEmpty(token)) 
    return null;
    
    let Token = null;
    try {
        Token = await utilToken.verify(token);
    } catch (error) {
        console.log(error)
        return null;
    }
    
    try {
        const userFound = await UserSchema.findById(Token.id);
        
        return userFound;
    } catch (erro) {
        console.log(erro);
        return null;
    }
};

exports.isAdmin = async (req, res) => {
    const user = await authToken(req.params.token);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    return res.status(STATUS_CODE_OK).send({ isAdmin: user.admin });
};

exports.authUser = async (req, res) => {
    const { userName, password } = req.body;

    if(userName === "admin") {
        if(password !== "admin") {
            return res.status(STATUS_CODE_ERROR).send({ message: "Usuário ou senha incorretos." });
        }

        let userAdmin = await UserSchema.findOne({ userName: userName });
        if(userAdmin === null) {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash("admin", salt);
            
            userAdmin = await new UserSchema({
                userName: "admin",
                email: "admin@admin.com",
                password: encryptedPassword,
                admin: true
            });
            
            await userAdmin.save();
        }
        userAdmin = await UserSchema.findOne({ userName: userName });
        const token = utilToken.generate(userAdmin._id);
        res.cookie("token", token);
        return res.status(STATUS_CODE_OK).send({ 
            message: "Admin logado com sucesso.",
            token: token
        });
    }
    
    if(util.isEmpty(userName) || util.isEmpty(password)) {
        return res.status(STATUS_CODE_ERROR).send({ message: "Dados insuficientes." });
    }
    let user = null;
    
    try {
        if(userName.includes("@")) user = await UserSchema.findOne({ email: userName });
        else user = await UserSchema.findOne({ userName: userName });

        //TODO:
        //se não achar tem que procurar nos admins
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

exports.createAdm = async (req, res) => {
    const { userName, email, password, confirmPassword, auth } = req.body;
    const user = await authToken(auth);
    if(user === null || user.admin === undefined || user.admin === false) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    if(util.isEmpty(userName) || util.isEmpty(email) || util.isEmpty(password) || util.isEmpty(confirmPassword)) {
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
        email: email,
        password: encryptedPassword,
        admin: true
    });

    try {
        await newUser.save();

        res.status(STATUS_CODE_OK).json({ 
            message: "Adm salvo com sucesso!",
        });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).json({
            message: "Erro ao salvar o usuário.",
            error: error
        });
    }
};

exports.create = async (req, res) => {
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
        password: encryptedPassword,
        admin: false
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
        if(user.image !== undefined && user.image !== null) {
            const image = await ImageSchema.findById(user.image);
            if(image !== null) {
                try {
                    fs.unlinkSync(image.src);
                } catch(e) {
                    console.log(e);
                }
                await image.deleteOne();
            }
        }

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
    const user = await authToken(req.body.auth);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await user.updateOne({
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
    const user = await authToken(req.body.auth);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    try {
        await user.updateOne({
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
    const user = await authToken(req.body.auth);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    try {
        await user.updateOne({
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
        });
    }
};

exports.updateImage = async (req, res) => {
    const user = await authToken(req.body.auth);

    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }

    const { idImage } = req.body;
    
    const oldImage = await ImageSchema.findById(user.image);
    if(oldImage !== null) {
        fs.unlinkSync(oldImage.src);
        oldImage.deleteOne();
    }

    const newImage = await ImageSchema.findById(idImage);
    try {
        await user.updateOne({
            image: newImage._id
        })

        res.status(STATUS_CODE_OK).send({ message: "Imagem linkada com o usuário com sucesso!", image: newImage });
    } catch(e) {
        res.status(STATUS_CODE_ERROR).send({ message: "Não foi possível achar a nova imagem" });
    }
};

exports.updatePassword = async (req, res) => {
    const user = await authToken(req.body.auth);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }
    
    const { oldPassword, newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);
    
    // verifica a senha antiga para prosseguir a atualização
    if (!(await user.matchPassword(oldPassword))) {
        res.status(STATUS_CODE_ERROR).json({
            message: "Senha incorreta.",
            error: new Error('Senha incorreta')
        });
        return;
    }

    // atualiza a senha no banco
    try {
        await user.updateOne({
            $set: {
                password: encryptedPassword
            }
        });
        res.status(STATUS_CODE_OK).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
        console.log(error);
        res.status(STATUS_CODE_ERROR).json({
            message: "Erro ao atualizar a senha.",
            error: error
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await UserSchema.find();
        let dataMapped = [];
        for(let i = 0; i < data.length; i++) {
            if(data[i].admin) {
                if(data[i].userName !== "admin")
                    dataMapped.push({image: undefined, user: data[i]});
            } else {
                const image = await ImageSchema.findById(data[i].image);
                let imgSrc = undefined;
                if(image !== null) imgSrc = image.src;
                dataMapped.push({image: imgSrc, user: data[i]});
            }
        }
        res.status(STATUS_CODE_OK).send(dataMapped);
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

exports.getUserByToken = async (req, res) => {
    const user = await authToken(req.params.token);
    if(user === null) {
        return res.status(STATUS_CODE_UNAUTHORIZED).json({ message: "Não autorizado." });
    }
    console.log(user);
    return res.status(STATUS_CODE_OK).send({message: "Usuário buscado com sucesso!", user: user});
};