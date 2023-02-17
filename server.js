const express = require('express');
const mongoose = require('mongoose')
const app = express();
//connection to PORT 3001
const PORT = process.env.PORT || 3001;

app.use(express.json());

// create middleware function
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api/index'));

// establish connection to mongoose and mongoDB database

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/socialnetworkDB1', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
//call function to connect to the database

connectDB()


mongoose.set('debug', true);

 //Establish where the PORT is listening from
app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));