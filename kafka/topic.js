// const Kafka = require("kafkajs").Kafka
// or  < it is similar as destructured >

const { Kafka } = require("kafkajs");

run();
async function run(){
    try{
        //first we need to establish a tcp connection to communicate with broker
        const kafka = new Kafka({
            "clientId" : "myapp",
            "brokers" : ["evans:9092", "evans:9092"]
        })

        // we will create admin 
        //[ to create topic you have to create a admin connetion]
        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected!");

        //now we create topics
        //A-M, N-Z
        await admin.createTopics({
            "topics" : [{
                "topic" : "Users",
                "numPartitions" : 2
            }]
        })
        console.log("Created Successfully!");
        await admin.disconnect();

    } catch(err){
        console.error(`Something bad happend ${err}`);
    }
    finally{
        process.exit(0);
    }
}