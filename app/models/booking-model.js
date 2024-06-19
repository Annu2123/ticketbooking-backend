const { ViewModule } = require('@mui/icons-material')
const {Schema,model}=require('mongoose')
const bookingSchema=new Schema({
    user_id: { 
        type:Schema.Types.ObjectId, 
        ref: 'User' },
  showtime_id: { 
    type:Schema.Types.ObjectId, 
    ref: 'ShowTime' },
  seats_booked:{
    type:[Number]
  } ,
},{timestamp:true})
const Booking=model('Booking',bookingSchema)
module.exports=Booking