const mongoose = require('mongoose');

const configDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://anubrath4994:1d91LQrX9C45crYx@movies.urx1z3g.mongodb.net/')
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message)
   
  
  }
};
module.exports = configDb;
