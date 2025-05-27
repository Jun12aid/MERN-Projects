const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
// const flash = require('connect-flash');

router.get('/', (req, res) => {
    res.render('index',{error,loggedin:false}); // error is already passed via res.locals
});

router.get('/shop',isloggedin, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render('shop',{ products,success });
});
router.get('/cart',isloggedin, async (req, res) => {
    let user = await userModel.findOne({email:req.body.email}).populate("cart");
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render('cart',{user,bill});
});
router.get('/addtocart/:productid',isloggedin, async (req, res) => {
    let user = await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to Cart");
    res.redirect("shop");
});

router.get('/logout', isloggedin ,(req, res) => {
    res.render("shop");
});


module.exports = router;