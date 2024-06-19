const ShowTime=require("../models/showtimes-model")
const {validationResult}=require("express-validator")
const moment = require('moment')
const Booking = require("../models/booking-model")
const showtimeCntrl={}
showtimeCntrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try {
        const showtime = new ShowTime(body)
        await showtime.save()
        res.status(201).json(showtime)
      } catch (err) {
        res.status(500).json({error:"internal server error"})
      }
}

const extractDay = (dateString) => {
  const splitDay = dateString.split("-")
  return splitDay[2];
}

const extractMonth = (dateString) => {
  const splitMonth = dateString.split("-")
  return splitMonth[1];
}

const extractYear = (dateString) => {
  console.log("date",dateString)
  const splitYear = dateString.split("-")
  console.log("split",splitYear)
  return splitYear[0].replace('"', '')
}
showtimeCntrl.getShowtimes = async (req, res) => {
  const id = req.params.id
  const { date } = req.query
 console.log("date",date)
  // Extract year, month, and day manually
  const year = parseInt(extractYear(date), 10)
  const month = parseInt(extractMonth(date), 10)
  const day = parseInt(extractDay(date), 10)

  console.log("day", day)
  console.log("month", month)
  console.log("year",year)
  try {
    // Find showtimes that match the movie_id and the provided date (year, month, day)
    const showtimes = await ShowTime.find({
      movie_id: id,
      $expr: {
        $and: [
          { $eq: [{ $year: "$showtime_date_time" }, year] },
          { $eq: [{ $month: "$showtime_date_time" }, month] },
          { $eq: [{ $dayOfMonth: "$showtime_date_time" }, day] }
        ]
      }
    }).populate("movie_id");

    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ error: "Showtimes not found" });
    }

    res.status(200).json(showtimes);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};
showtimeCntrl.findshow=async(req,res)=>{
  const id=req.params.id
  console.log("id",id)
  try{
   const booking=await Booking.find({ showtime_id:id })
   res.status(200).json(booking)
  }catch(err){
    res.status(500).json({error:"intrnal server error"})
  }
}


  module.exports=showtimeCntrl