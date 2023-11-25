const amqp = require("amqplib");

connect();

// first abstraction
async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            // console.log(message);
            console.log(message.content.toString());
            const input = JSON.parse(message.content.toString());
            console.log(`received job with input : ${input.number}`);

            // for acknowledgment
            if(input.number == 10){
                channel.ack(message);
            }
        })
        console.log("waiting for the messages")
    } catch(err){
        console.log(err);
    }
}