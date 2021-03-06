const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())


const cors = require('cors');
app.use(cors());


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sviden:wsa123456@cluster0.nkfxr.mongodb.net/toDoApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  console.log("database connected");
});


// const taskModel = require('./models/Task.js');
const quotesModel = require('./models/Quotes.js');
const userModel = require('./models/Task.js')

app.get('/newtask', async (req, res) => { 
  
  
   quotesModel.find({}, (err, result) => {
    if(err){
        res.send(err);
    }
    res.send(result);
  })
})

app.post('/addtask', async (req, res) => {


    // const [reqtitle, reqDescription, reqFile] = req.body;
  const taskTitle = req.body.taskTitle;
  const details = req.body.details;
  const imgUrl = req.body.imageUrl;
  const createDate = req.body.createDate;
  const userEmail = req.body.userEmail;

  
    const task ={title: taskTitle, 
        description: details,
        imageOrFile: imgUrl,
        createDate: createDate};
         
    
        
   try {  
     await userModel.updateOne({email:userEmail}, {$push: {tasks:task}});
       console.log('task saved');

   } catch (error) {
       console.log(error)
   }
   
  res.send();
})

//get data from database
app.get('/alltasks', async(req, res) => {
  
  const email = req.query.email;
   console.log(email)
    let response = await userModel.findOne({email:email}).select({tasks: 1, _id:0});
    const tasks = response.tasks;
    console.log(JSON.stringify(tasks));
    res.send(tasks);

})

app.listen(3001, (req, res) =>{
  console.log('server runnning on port 3001')
})


//delete task

app.delete('/deletetask/:id/:mail', async(req, res) => {
  console.log(req.query);
  const id = req.params.id;
  const mail = req.params.mail;
  console.log(id);
  
  let response = await userModel.updateOne({email: mail}, {$pull: {tasks: {_id : id}}} );

  console.log(response);
  res.send('deleted');  
})

//update task

app.put('/updatetask/:id', async(req, res) => {
  const id = req.params.id;
  const taskTitle = req.body.taskTitle;
  const details = req.body.details;
  console.log(taskTitle);
  const task = await taskModel.findOne({_id: id});
  console.log(task);
  await taskModel.updateOne(task, {
    title: taskTitle,
    description: details
  });
  res.send('updated');

})


//create user

app.post("/signup", async(req, res) => {
  const userName = req.body.user;
  const email = req.body.email;
  const password = req.body.password;
  
  const newUser = new userModel({
    userName,
    email,
    password
  })
  try {
    const checkUser = await userModel.findOne({email: email});
    console.log("FIND USER: ", checkUser)
    if(checkUser === null){
          await newUser.save(); 
          console.log('user saved');
    }else {
      console.log('user exist');

      res.send("userExist");
    }


} catch (error) {
   console.log(error)
}

res.send();

})


//Check if exist

app.post('/login', async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  try
  {
    const user = await userModel.findOne({email: email, password: password});
    console.log(user);
    if(user === null){
      res.send('User does not exist')
    }else{
        res.send(user);
    }
  
  }
  catch (e)
  {
    console.log(e);
  }
  

})