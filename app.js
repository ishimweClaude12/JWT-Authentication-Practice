const bodyParser = require('body-parser');
const { json } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/ninjas';
mongoose.connect(dbURI)
  .then((result) => {app.listen(3300), console.log("Server Started at port 3333");})
  
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)

















// Cookies
// app.get('/set-cookies', (req, res)=>{

//   res.cookie('newUser', false)

//   res.send('You have got the cookie in your browser')
// })

//, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }