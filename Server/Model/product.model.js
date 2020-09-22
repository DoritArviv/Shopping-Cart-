const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title : String,
    description :  String,
    price : Number,
    imagePath : String
    
});
 
module.exports = mongoose.model('product', ProductSchema);
