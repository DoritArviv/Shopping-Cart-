const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
   id: {type : Number},
   user: {type : String},
   products: [
      {
         title : String,
         description :  String,
         price : Number,
         imagePath : String
         
     }
   ]
});
 
module.exports = mongoose.model('cart', CartSchema);
