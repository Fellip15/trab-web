const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    src: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('Image', ImageSchema)