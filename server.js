const express = require('express');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes/api/index'));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/socialnetworkDB', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
connectDB()

 
mongoose.set('debug', true);

app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));