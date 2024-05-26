const mongoose=require('mongoose')
const secretaireSchema=mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
        },
        telephone:{
            type:String,
            required:false,
        },
        cin:{
            type:String,
            required: true,
        },
        role:{
            type:String,
            required:true,
        },

        password:{
              type:String,
            required : true,
        },
        verified: {
            type: Boolean,
            default: false,
        }, 
        role: {
            type: String,          
        },
        veterinarian:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Veterinary',
            required:true
        }
    },
    {
        timestamps:true,
    }

)
module.exports=mongoose.model('Secretaire',secretaireSchema)