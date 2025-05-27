const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({
    fullname : {
        type: String,
        minlenght: 3,
        trim: true,
    },
    email : String,
    password : String,
    products : {
        type : Array,
        default : []
    },
    picture : String,
    gstin : Number

});

module.exports = mongoose.model('owner', ownerSchema);