import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    description : {
        required : true,
        type : String,
    },
    name : {
        required : true,
        type : String,
    },
    productImage : {
        type : String
    },
    price : {
        type : Number,
        default : 0,
    },
    stock : {
        type : Number,
        default : 0,
    },
    //todo // now i want our each product should belong to a category
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true, 
    },
    // we want to define ownership of user
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
}, {timestamps : true});

export const Product = mongoose.model("Product", productSchema);

//inside the objects order doesn't matter
//inside the array order matters

// we can store buffers<images, pdfs,..> also in mongodb 
//but we should not make our db heavy by putting the buffers in the database

// generally
//  it is put on our server in a different folder and we take public url of that folder
// or we generally third party services like we stored on aws bucket and their sdk gives us url and we save that url in our db

//todo cloudnary : videos, photos [gives url back]