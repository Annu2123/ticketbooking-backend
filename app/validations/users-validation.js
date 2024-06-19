const User=require('../models/usrs-model')
const userRegisterValidation={
     userName:{
        notEmpty:{
            errorMessage:"username is require"
        },
     },
     email:{
        notEmpty:{
            errorMessage:"email is require"
        },
        trim: true,
        isEmail:{
            errorMessage:"email should be valide formate"
        },
        custom:{
            options: async function(value){
                console.log(value)
                const users= await User.findOne({email:value})
                if(!users){
                  return true
                }else{
                    throw new Error ('email is already exist')
                }
            }
        },
        normalizeEmail: true
     },
     password:{
        notEmpty:{
            errorMessage:"password is require"
        },
        isLength:{
            option:{min:8,max:128},
            errorMessage:"password should be between 8-128 charactore"
        },
        trim: true
     }
}
const userLogginSchema={
    email:{
       notEmpty:{
        errorMessage:'email is required'
       },
       trim: true,
       isEmail:{
        errorMessage:"email should be valid format"
       }
    },
    password:{
        notEmpty:{
            errorMessage:"password is required"
        },
        isLength:{
            option:{min:8,max:128}
        }
    }
}
module.exports={userRegisterValidation,
    userLogginSchema
}