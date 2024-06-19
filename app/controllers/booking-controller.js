const Booking=require("../models/booking-model")
const ShowTime=require('../models/showtimes-model')
const bookingCntrl={}
bookingCntrl.create=async(req,res)=>{
    const body=req.body
    try{
      const userId=req.user.id
      const booking= new Booking(body)
      booking.user_id=userId
     await  booking.save()
      res.status(201).json(booking)
    }catch(err){
        res.status(500).json({error:"internal server error Boo"})
    }
}
bookingCntrl.update=async(req,res)=>{
    const id=req.params.id
    try{
        const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(booking)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
bookingCntrl.delete=async(req,res)=>{
    const id=req.params.id
    try{
        const booking = await Booking.findByIdAndDelete(id)
        // const showtime = await ShowTime.findById(booking.showtime_id);
        // showtime.available_seats += booking.seats_booked;
        // await showtime.save()
        res.status(200).json(booking)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
bookingCntrl.list=async(req,res)=>{
    try{
        const userId=req.user.id
        const bookings=await Booking.find({user_id:userId}) .populate({
            path: 'showtime_id',
            populate: {
              path: 'movie_id'
            }
          });
        res.status(200).json(bookings)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
bookingCntrl.listAll=async(req,res)=>{
    try{
        const bookings=await Booking.find() .populate({
            path: 'showtime_id',
            populate: {
              path: 'movie_id'
            }
          });
        res.status(200).json(bookings)
    }catch(err){
        res.status(500).json({error:"internal server error"})
    }
}
module.exports=bookingCntrl