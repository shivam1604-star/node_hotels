const mongoose = require('mongoose');

// Define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'   //replace the name instead of hotel

 // Set up MongoDb connection
 mongoose.connect(mongoURL, {
   useNewUrlParser : true,
  useUnifiedTopology : true,
 })

 // Get the default connection
// Mongoose maintains a default connection object representing the mongodb connection
 const db = mongoose.connection;

 // Define event listeners for database connection

 db.on('connected',()=>{
   console.log('connected to mongodb server');
 });

 db.on ('disconnected', ()=>{
  console.log('mongodb disconnected');
 });

 db.on ('error', (err)=>{
   console.log('mongodb connection error:',err);
 });

 //Export the database connection
 module.exports = db;