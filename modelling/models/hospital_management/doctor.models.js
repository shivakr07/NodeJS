import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true,
    },
    qualification : {
        type : String,
        required : true,
    },
    experienceInYears : {
        type : Number,
        default : 0
    },
    //since doctors works in multiple hospitals so
    worksInHospitals : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hospital"
        }
    ],
    //todo : since there might be a case where you also want to give a doctor how many hrs in which hospital they spend/work  :    so it needs one more mini schema like previous one but here we are just doing it and in other we can do it later
    // like here we did if we define this on that schema then here we need to give only name of that schema instead of the writing the whole {object} : //todo : like [newSchema]

}, {timestamps : true})

export const Doctor = mongoose.model(
    "Doctor", 
    doctorSchema
    );