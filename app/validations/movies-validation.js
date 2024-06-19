const moviesValidation={
    title:{
        notEmpty:{
            errorMessage:"movie title  is require"
        },
     },
     genre:{
        notEmpty:{
            errorMessage:"genre is require"
        },
     }
}
module.exports={moviesValidation}