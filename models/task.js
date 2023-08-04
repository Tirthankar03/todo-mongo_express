//require the library
const mongoose = require('mongoose');

//creating schema for tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: 'string',
        required: true
    }, category: {
        type: 'string',
        required: true
    }, date:{
        type: 'date',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

//exporting the schema
module.exports = Task;


