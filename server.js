const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const body_parser = require('body-parser');
const routes = require('./src/routes');
const tls = require('tls');
const https = require('https');
const fs = require('fs');
const { Server } = require('http');

const options ={
 // key: fs.readFileSync("./server.key"),
 // cert: fs.readFileSync("./server.crt"),
  passphrase: 'hello',
  requestCert: false,
  port: 8089,
}

dotenv.config();
const app = express(); 
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8089;
const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error) =>{
  if(error){
    console.log("Mongodb error", error.message);
  }
});

mongoose.connection.once('open', () =>{
  console.log('Mongodb connected');
});

app.listen(PORT, () =>{
      console.log(`Server running on ${PORT}`);
});

app.route('/').get((req, res) => {
  res.send('Welcome to ANB backend');
  
})

routes(app);