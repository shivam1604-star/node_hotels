const express = require('express');
// import express from 'express'
const app = express();
const db = require('./db');
require('dotenv').config();
// import { db } from './models/Person.js';

const bodyParser = require('body-parser');
// import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));  // store objects or data in req.body and we can easily use it

const PORT = process.env.PORT || 3000;


app.use(express.json())

const Person = require('./models/Person');

// const menuItem = require('./models/menuItem');


app.get('/', function (req, res) {
  res.send('Welcome to my hotel ... How can i help you ?, We have list of meus')
})

app.get('/paneer', (req, res) => {
  res.send('sure sir, i would love to serve you paneer')
})

app.get('/milk', (req, res) => {
  var customized_milk = {
    company: 'vita',
    quantity: '1 litre',
    price: '50 rs',
    is_packed: true,
    is_fresh: true,
  }
  res.send(customized_milk)
})

// // POST route to add a person
// app.post('/Person', (req,res)=>{
//   const data = req.body  // Assuming the request body contains the person data

//   // Create a new person document using the Mongoose model
//   // const newPerson = new Person();
//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
//   // newPerson.address = data.address;  // instead of this we write or portion

//                  //OR
//   const newPerson = new Person(data);               

//   // Save the new person to the database
//   newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log('Error saving person :',error);
//       res.status(500).json({error:'Internal server error'})
//     }
//     else{
//       console.log('data saved successfuly');
//       res.status(200).json(savedPerson);
//     }
// })
// })




// Post route to add a person
app.post('/person', async (req, res) => {
  try {
    const data = req.body // Assuing the request body containg the person data
    // console.log(data);s
    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err, "Server error");
    res.status(500).json({ error: 'Internal Server Error' })

  }
})

// GET method to get the person
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



// // POST Method to add Menu item
// app.post('/menu', async (req,res)=>{
//   try{
//     const data = req.body
//     const newMenuItem = new MenuItem(data);
//     const response = await newMenuItem.save();
//     console.log('data saved');
//     res.status(200).json(response);
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({
//       error:  'Internal Server Error'
//     });
//   }
// })

// // GET method to get Menu items
// app.get('/menu', async (req,res)=>{
// try{
//   const data = await MenuItem.find();
//   console.log('data fetched')
//   res.status(200).json(data)
// } catch (err){
//   console.log (err);
//   res.status(500).json({error: 'Internal Server Error'})
// }
// }
//)





// Paramaterised API calls
app.get('/person/:workType', async (
  req, res
) => {
  try {
    const workType = req.params.workType;    // Extract the workType from the url parameter
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter'

    ) {
      const response = await Person.find({
        work: workType
      });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid workType' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}
)




// Import the router files
const personRoutes = require('./routes/personRoutes');
//const menuItemRoutes = require('./routes/menuItemsRoutes');

// Use the routers
app.use('/person', personRoutes);
//app.use('/menu', menuItemsRoutes);

const port = 3000;

app.listen(port, () => {
  console.log('listening on port 3000');
})