const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User = require('./models/User')

const server=express()
server.use(cors())
server.use(bodyParser.json())

mongoose.connect('mongodb+srv://rohan:Rohan%40123@cluster0.ajnxzuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('Database is connected')) .catch((err)=>console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password}=req.body
        const userObj= new User({fullName,userName,age,password})
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,
                message:'User already exist'
            })
        }
        await userObj.save()
        res.json({
            status:true,
            message:'user register successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`Error ${error}`
        })
    }
})
server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
            return res.json({
                status:false,
                message:'User not found'
            })
        }
        if(password!==userExist.password){
            return res.json({
                status:false,
                message:'Password is incorrect'
            })
        }
        res.json({
            status:true,
            message:'User logged in successfully'
        })
    }
    catch(error){
        res.json({
            status:false,
            message:`error:${error}`
        })
    }
})
server.listen(8055,()=>{
    console.log('server is listen on port no 8055')
})