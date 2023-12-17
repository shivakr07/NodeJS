const amqp = require("amqplib");

// const msg = {number : 07} taking input from command line
const msg = {number : process.argv[2]}
connect();
// first abstraction
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        // crate a channel
        const channel = await connection.createChannel(); 
        // now we'll be publishing to a queue 
        const result = await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`JOb sent succesfully1 ${msg.number}`);
    } catch(err){
        console.log(err);
    }
}















// const amqp = require("amqplib");

// // const msg = {number : 07}
// const msg = {number : process.argv[2]}
// connect();
// // first abstraction
// async function connect(){
//     try{
//         const connection = await amqp.connect("amqp://localhost:5672");
//         // crate a channel
//         const channel = await connection.createChannel();
//         // now we have channel 
//         // we are gonna publish to a queue 
//         // <acc to doc it doesn't know about queue>
//         const result = await channel.assertQueue("jobs");
//         channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
//         // you can also do like say hii
//         // channel.sendToQueue("jobs", Buffer.from("hi"));

//         console.log(`JOb sent succesfully1 ${msg.number}`);

//     } catch(err){
//         console.log(err);
//     }
// }