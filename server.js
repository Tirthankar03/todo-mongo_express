const express = require('express');
const port = 7000;

//importing db
const db = require('./config/mongoose');

//importing the Schema for tasks
const Task = require('./models/task');

//using express 
const app = express();

//creates a middleware: express becomes able to check if the requested static files are from the ./views and sends the response (ejs, html,css)
// const staticFiles = express.static("./views");
// app.use(staticFiles);

//to use encrypted files
app.use(express.urlencoded());

//sets EJS as the view engine to render dynamic content using templates stored in the "./views" directory.
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering the App Page
// app.get('/', function(req, res){
//     Task.find({}, function(err, task){
//         if(err){
//             console.log('Error in fetching tasks from db');
//             return;
//         }

//         return res.render('home', {
//             tittle: "Home",
//             task: task
//         });
//     }
// )});

// app.get('/', (req, res) =>{
//     Task.find({}, (err, task) =>{
//         if(err){
//             console.log('Error in fetching tasks from db');
//         }else{    
//         res.render('home', {
//             title: "Home",
//             tasks: task
//         });
//         }
//     }
// )});

app.get('/', async (req, res) => {
    try {
      const tasks = await Task.find({}).exec();
      res.render('home', {
        title: 'Home',
        tasks: tasks,
      });
    } catch (err) {
      console.error('Error fetching tasks from db:', err);
      // Handle the error, e.g., render an error page or send an error response.
    }
  });
  

//creating tasks
app.post('/create',async (req, res) =>{
    try {
        const newTask = await Task.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date
        });
        console.log("New task created", newTask);
            //redirects back to / i.e home page where it again encounters get request to see all the tasks in the db
            res.redirect('back');
    } catch (err) {
            console.log('error creating task', err);
        }
    });


//delete tasks
app.get('/delete',async (req, res) =>{
    try {
        //get id from query
        const id = req.query;

        //checking the number of task selected to delete
        const count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            //finding and deleting tasks from the db one by one using id
            const deleteTask = await Task.findByIdAndDelete( Object.keys(id)[i]).exec();
            console.log("Task successfully deleted", deleteTask);
            res.redirect('back');
        }
    } catch (err) {
        console.log("error deleting task", err);
    }
});









//make the app listen on assigned port
app.listen(port, (err)=>{
    if (err) {
        console.log(`error in running the server: ${err}`);
    } else {
        console.log(`server is running on port: ${port}`);
    }
});