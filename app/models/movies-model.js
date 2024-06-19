const {Schema,model}=require('mongoose')
const moviesSchema=new Schema({
    title: String,
    genre: String,
},{timestamp:true})
const Movie=model("movie",moviesSchema)
module.exports=Movie