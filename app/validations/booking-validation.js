const bookingValidation={
    showtime_id: { 
        notEmpty:{
            errorMessage:"showtime is require is require"
        },
    },
      seats_booked:{
        notEmpty:{
            errorMessage:"seat number is require"
        },
      }
}
module.exports= {bookingValidation}