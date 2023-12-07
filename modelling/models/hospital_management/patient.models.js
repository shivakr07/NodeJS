import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            requierd : true,
        },
        diagnosedWith : {
            type : String,
            required : true,
        },
        address : {
            type : String,
            required : true,
        },
        age : {
            type : Number,
            required : true,
        },
        bloodGroup : {  //you can give enums here
            type : String,
            required : true,
        },
        gender : {
            type : String,
            enum : ["M", "F", "O"],
            required : true,
        },
        admittedIn : { //need to give reference of the hospital
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hospital"
        },
    }, 
    {timestamps : true}
);

export const Patient = mongoose.model(
    "Patient", 
    patientSchema,
    );                                    