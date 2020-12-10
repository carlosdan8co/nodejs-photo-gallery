const router = require('express').Router();

const Photo =require('../models/Photo');
const cloudinary=require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const fsx=require('fs-extra');

router.get('/',async(req,res)=>{
    const photos=await Photo.find();
    //console.log(photos);
    res.render('images',{photos});
});

router.get('/images/add', async(req,res)=>{
    const photos=await Photo.find();
    res.render('image_form',{photos});
});

router.post('/images/add',async(req,res)=>{
    const{title,description} = req.body;
    //console.log(req.file);
    const result=await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto= new Photo({
        title,
        description,
        imageURL:result.url,
        public_id:result.public_id
    })
    await newPhoto.save();
    await fsx.unlink(req.file.path);
    const photos=await Photo.find();
    res.render('image_form',{photos});
});

router.get('/images',(req,res)=>{
    res.render('images');
});

router.get('/images/delete/:photo_id',async(req,res)=>{
    const {photo_id}=req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    const result =await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result);
    const photos=await Photo.find();
    res.render('image_form',{photos});
});

module.exports= router;