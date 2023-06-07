const express = require("express")
const indexController = require("../controllers/index.controller")
const passport = require("passport");
const { isAuthenticated } = require("../controllers/auth");
const router = express.Router()

router.get('/login', (req,res) =>{
    indexController.login(req,res)
});
router.get('/home',  isAuthenticated,(req,res) =>{
    indexController.home(req,res)
});

router.get('/register', (req,res) =>{
    indexController.register(req,res)
});

router.post('/login',passport.authenticate("local",{failureRedirect:"/register"}),async (req, res)=>{
    res.redirect('/home');
});

router.post('/register', (req,res) =>{
    indexController.CreateUser(req,res)
});
router.get('/auth', isAuthenticated,(req,res) =>{
     res.send(req.user);
});


module.exports  = router