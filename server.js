const express = require('express');
const port = 7000;

//importing db
const db = require('./config/mongoose');

//importing the Schema for tasks
const Task = require('./models/task');

//using express 
const app = express();

//creates a middleware: express becomes able to check if the requested static files are from the ./views and sends the response (ejs, html,css)
const staticFiles = express.static("./views");
app.use(staticFiles);

//to use encrypted files
app.use(express.urlencoded());

//sets EJS as the view engine to render dynamic content using templates stored in the "./views" directory.
app.use('view engine', 'ejs');
app.set('views', './views');

//creating a custom error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error in fetching tasks from db: ", err);
    res.status(500).send("something went wrong!");
};
//rendering the App page
app.get('/', async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.render('home', {title: 'Home', tasks: tasks});
    } catch (err) {
        next(err);
    }
});

//attach the error handling middleware at the end of your middleware
app.use(errorHandler);




















//create tasks

//delete tasks

//make the app listen on assigned port