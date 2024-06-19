const {Schema,model}=require('mongoose')
const usersSchema= new Schema({
    userName:String,
    email:String,
    password:String,
    role:String
},{timestamp:true})
const User=model("User",usersSchema)
module.exports=User