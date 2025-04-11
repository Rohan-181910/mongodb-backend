const express=require('express')
const product = require('../models/Product')
const router=express.Router()

router.post('/add',async(req,res)=>{
    try{
        const {productName,productPrice,productUnit,productDescription}=req.body
        const productObj= new product({productName,productPrice,productUnit,productDescription})
        const productExit=await product.findOne({productName})
        if(productExit){
            return res.json({
                status:false,
                message:'Product already exit'
            })
        }
        await productObj.save()
        res.json({
            status:true,
            message:'product added  successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})
router.get('/get',async(req,res)=>{
    try{
        const result=await product.find()
        res.json({
            status:true,
            message:result
        })
    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        const id =req.params.id
        await product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:'Product deleted successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})
router.put('/update/:id',async(req,res)=>{
    try{
        const id=req.params.id
        await product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:'Product updated successfully'
        })

    }
    catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})






module.exports=router