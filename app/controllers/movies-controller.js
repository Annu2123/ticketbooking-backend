const { validationResult } = require('express-validator')
const Movie=require('../models/movies-model')
const moviesCntrl={}
moviesCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body=req.body
        const movie=new Movie(body)
        await movie.save()
        res.status(201).json(movie)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
moviesCntrl.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const movie=await Movie.findOneAndUpdate({_movie_id:id},body,{new:true})
        res.status(201).json(movie)
    }catch(err){
        res.status(401).json({error:"internal server error"})
    }
}
moviesCntrl.delete=async(req,res)=>{
    const id=req.params.id
    try{
        const movie=await Movie.findOneAndDelete({movie_id:id},{new:true})
        res.status(201).json(movie)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
moviesCntrl.list=async(req,res)=>{
    try{
        const movie=await Movie.find().sort({createdAt:-1})
          res.status(200).json(movie)
    }catch(err){
        res.status(500).json({error:'internal server error'})
    }
}
module.exports=moviesCntrl