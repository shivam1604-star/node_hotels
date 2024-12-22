const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongodb connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels'   //replace the name instead of hotel
//const mongoURL = 'mongodb+srv://shivam16:shivam123@cluster0.1ycod.mongodb.net/'



// for .env file
//const mongoURL =process.env.MONGODB_URL LOCAL 

const mongoURL = process.env.MONGODB_URL;

// Set up MongoDb connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Get the default connection
// Mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
  console.log('connected to mongodb server');
});

db.on('disconnected', () => {
  console.log('mongodb disconnected');
});

db.on('error', (err) => {
  console.log('mongodb connection error:', err);
});

//Export the database connection
module.exports = db;