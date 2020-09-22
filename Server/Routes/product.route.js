const express = require('express');
const router = express.Router();
const Product = require('../Model/product.model');
const User = require('../Model/user.model');
const Cart = require('../Model/cart.model');
const jwt = require('jsonwebtoken');
const env = require('../envairoment/env');


async function getNexId(){
    let collection = null ;
    collection = await Cart.find({})
    let id = 0;
    collection.forEach((el) => {
        if (el.id > id) {
            id = el.id;
        }
    });
    return (id + 1);
}

async function getUser(token) {
    // let token = req.body.token
    console.log('Find user');
    let userFromClient = await jwt.verify(token, env.secret);
    // console.log(userFromClient); - all the info of user
    let user = await User.findOne({username: userFromClient.loginUser.username}); //
    // console.log('object is :' + user);
    if (user === null) {
        console.log('Can\'t find user');
        throw 'Cannot find user'
    }

    return user;
}


async function getUserCart(req) {
    let user = await getUser(req);
    console.log('Find cart');
    let cart = await Cart.findOne({user : user.username});
    if (cart !== null) {
        // console.log(cart);
        return cart;
    }
    
    console.log('Can\'t find cart');
    // Create a new cart for the user
    let userId = await getNexId();
    cart = new Cart({
        id: userId,
        user: user.username,
        products: []
    });

    await cart.save()
    console.log('Saved');
    return cart;
}

// find singel product
async function getProduct(req){
    let product_id = req.body.id

    let obj_pro = await Product.findOne({_id :product_id },(err,pro)=>{
        if (err) {
            console.log('Cannot find product ');
        }
        return  pro.toObject
    })
    return obj_pro


} 


// Add Pruduct To Cart
router.route('/cart/add_product').post(async(req, res) => {
    let cart = await getUserCart(req.body.token);
    let obj_product =  await getProduct(req) // find 
    cart.products.push(obj_product);
    await cart.save()

    return res.json(cart);
});         


//AThu
router.route('/cart/:token').get(async(req, res) => {
let headerToken = req.params.token
if(headerToken === null){
    console.log('Cannot find User ');
}
let user = await getUserCart(headerToken)
if(user === null){
    console.log('Cannot find User cart ');
                res.status(400).send(err);
}
res.json(user)
});

// Remove Pruduct To Cart
router.route('/cart/remove_product').post(async(req, res) => {
    let product_id = req.body.id

    let cart = await getUserCart(req.body.token); // find user cart 
    let indexId = cart.products.map(x=>x.id) // find index by id 
    // console.log(indexId);
    
    const index_of_product = indexId.indexOf(product_id);
    if (index_of_product === -1) {
        console.log('Cant find product in cart');
        return res.json(cart);
    }

    cart.products.splice(index_of_product, 1);
    
    await cart.save()
    
    // console.log(cart);
    return res.json(cart);
});   


router.route('/cart/clear').post(async(req,res) => {
    let user = await getUser(req);
    Cart.findOneAndDelete({user : user.username},(err) => {
        if (err) {
            res.status(400).send(err);
        }
        res.status(200).json({'success': 'Product Deleted From Card'});
    })
});

    


// Get All Products
router.route('/products').get((req, res) => {
    Product.find((err, prod) => {
        if (err) {
            console.log('Cannot find prods');
            res.status(400).send(err);
        }
        res.status(200).send(prod);
    })
});


module.exports = router;
