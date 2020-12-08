const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('images');
});

router.get('/images/add',(req,res)=>{
    res.render('image_form');
});

router.get('/images',(req,res)=>{
    res.render('images');
});

module.exports= router;