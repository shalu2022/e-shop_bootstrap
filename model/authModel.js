const mongoose = require('mongoose')
const Auth = new mongoose.Schema({
    name:{
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
    mobile:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type:String,
        default: "user"
    },
    orders:{
        type: Array,
        default: []
    },
    cart:{
        type:Array,
        default:[]
    },
    image: {
        type: Object,
        default:{
            url: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        }
    }
},{
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("Auth", Auth)