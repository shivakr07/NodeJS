import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    //here timestamps doesn't make any sense <it's flooding without need>
    // and neither we need to store all the details of the product : so we need prod id and i'll reference/find it from the products
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    quantity : {
        type : Number,
        required :  true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice : {
        type : Number,
        required : true,
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    orderItems : {
        type : []
        //the new logic needed that we need how much quantity of which product we orderd but in products we can't defined [because we are maintaining stock in product] it so we will make a simple schema here itself <<above>>
    }
}, {timestamps : true});


export const Order = mongoose.model("Order", orderSchema);