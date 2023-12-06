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
        type : [orderItemSchema]
        //the new logic needed that we need how much quantity of which product we orderd but in products we can't defined [because we are maintaining stock in product] it so we will make a simple schema here itself <<above>>
    },
    address : { // even you can make a schema for address
        type : String,
        required : true, 
    },
    // now there is an interesting case that is if you want to
    // add status [delivered, shipped, ...] but you want to fix it so that user can't just put different spelling of delivered
    // a kind of restriction [we define it in data modelling]
    status : {
        type : String,
        enum : ["PENDING", "CANCELLED", "DELIVERED"],
        //it give choice [instead of just writing your own spell]
        // todo also required
        default : "PENDING",
    }
}, {timestamps : true});


export const Order = mongoose.model("Order", orderSchema);