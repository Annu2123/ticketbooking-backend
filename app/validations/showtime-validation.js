const showtimeValidation={
    movie_id: { 
        notEmpty:{
            errorMessage:"movie id is require"
        },
        isMongoId:{
            errorMessage:"movie should be a valide id"
        },
    },
    showtime_date_time:{
        notEmpty:{
            errorMessage:"showtime is require"
        },
    },
    available_seats:{
        notEmpty:{
            errorMessage:"available seats is require"
        },
    },
    total_seats:{
        notEmpty:{
            errorMessage:"total seats is require"
        },
    }
}
module.exports={showtimeValidation}