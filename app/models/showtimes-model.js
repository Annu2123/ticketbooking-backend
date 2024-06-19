const {Schema,model}=require('mongoose')
const showtimesSchema=new Schema({
    movie_id: { 
        type:Schema.Types.ObjectId, 
        ref: 'movie' },
    showtime_date_time:Date,
    available_seats: Number,
    total_seats: Number,
},{timestamp:true})
const ShowTime=model("ShowTime",showtimesSchema)
module.exports=ShowTime