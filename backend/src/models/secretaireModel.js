const mongoose=require('mongoose')
const secretaireSchema=mongoose.Schema(
    {
        firstname:{
            type:String,
            required: true,
        },

        lastname:{
            type:String,
            required: true,
        },
        telephone:{
            type:String,
            required:false,
        },
        CIN:{
            type:String,
            required: true,
        },

        email:{
            type:String,
            unique:true,
        },
        password:{
              type:String,
            required : true,
        },
        
    },
    {
        timestamps:true,
    }

)
module.exports=mongoose.model('Secretaire',secretaireSchema)