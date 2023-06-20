const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    numParc: {
        type: Number,
        default: 1
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    }],
    stock: {
        type: Number,
        default: 1
    },
    sold: {
        type: Number,
        default: 0
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('Item', ItemSchema)