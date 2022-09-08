const mongoose = require("mongoose");
const ProductModal = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide product title"],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters'],
        unique: true
    },
    category: {
        type: String,
        required: [true, "Please provide category"]
    },
    price: {
        type: Number,
        required: [true, "Please provide the price"]
    },
    qnty:{
        type: String,
        required: [true, "Please provide the quantity"]
    },
    desc:{
        type: String,
        required: [true, "Please provide description"]
    },
    image:{
        type: Object,
        required:[true, 'Please provide image object']
    },
    stock:{
        type: Number,
        required:[true, "Please provide the stock"]
    },
    sold:{
        type: Number,
        default: false
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    rating:{
        type: Array,
        default: []
    }
},{
    collection:"products",
    timestamps:true
})

module.exports = mongoose.model("Product", ProductModal)