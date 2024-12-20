const mongoose =require('mongoose');

// define the Person schema
const personSchema = new mongoose.Schema({
  name: {
    type :String,
    required : true
  },
  age: {
    type : Number
  },
  work: {
    type :String,
    enum : ['chef','waiter','maanger'],
    required : true
  },
  mobile:{
    type : String,
    required : true
  },  
  email:{
    type : String,
    required : true,
    unique : true
  }, 
  address:{
    type : String,
  },
  salary:{
    type : Number,
    required : true
  }
});


//  Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;