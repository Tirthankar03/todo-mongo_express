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
app.use('view engine', 'ejs');
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

app.get('/', (req, res) =>{
    Task.find({}, (err, task) =>{
        if(err){
            console.log('Error in fetching tasks from db');
        }else{    
        res.render('home', {
            title: "Home",
            tasks: task
        });
        }
    }
)});

//creating tasks
app.post('/create', (req, res) =>{
    Task.create({},(err, newTask) =>{
        if (err) {
            console.log('error creating task', err);
        } else {
            //redirects back to / i.e home page where it again encounters get request to see all the tasks in the db
            res.redirect('back');
        }
    });
});


//delete tasks









//make the app listen on assigned port
app.listen(port, (err)=>{
    if (err) {
        console.log(`error in running the server: ${err}`);
    } else {
        console.log(`server is running on port: ${port}`);
    }
});