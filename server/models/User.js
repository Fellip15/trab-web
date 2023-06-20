const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : String,
    password : String
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);;
};

module.exports = mongoose.model('User', UserSchema)