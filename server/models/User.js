const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tel: {
        type: Number,
        required: false
    },
    cpf: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
        trim: false
    },
    end_street: {
        type: String,
        required: false,
        default: "",
        trim: true
    },
    end_num: {
        type: Number,
        required: false,
        default: 0
    },
    end_neighborhood: {
        type: String,
        required: false,
        default: "",
        trim: true
    },
    end_cep: {
        type: Number,
        required: false,
        default: 0,
        trim: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Image'
    }
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema)