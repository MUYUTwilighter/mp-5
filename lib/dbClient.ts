import {MongoClient} from "mongodb";

const CLIENT = new MongoClient(process.env.MGDB ? process.env.MGDB : "");

CLIENT.connect().then(client => {
    client.db("main").command({ping: 1}).then(() => console.log("Connected to DB"));
}).catch(reason => console.log(reason));

export default CLIENT;