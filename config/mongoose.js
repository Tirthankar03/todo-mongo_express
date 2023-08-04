//require the library
const mongoose = require('mongoose');

//connnect to the database
async function connectToDb(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        console.log("Connected to database ganguli hetachuda😳");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

connectToDb();

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"))

//up and running then print the message
db.once('open', () => {
    console.log('connected to the funcking database!');
});

//exporting the database
module.exports = db;