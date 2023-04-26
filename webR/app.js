const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const path = require('path');
const cookieParser= require('cookie-parser');
const session=require('express-session');

app.set('view engine','pug');
app.set('views','./views');

///////VERİTABANI
const sequelize=require('./utility/database');

////////////ROTALAR
const adminRoutes=require('./routes/admin');
const userRoutes=require('./routes/user');
const accountRoutes=require('./routes/account');

//////////MODELLER
const Material = require('./models/material');
const { Sequelize } = require('sequelize');
const Account = require('./models/account');
const Wallet = require('./models/wallet');

///////MİDDLEWARE
app.use(express.static(path.join(__dirname,'docs')));


app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: {
      maxAge:3600000
   }
}));

app.use(cookieParser());
app.use('/admin',adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);



app.set('views',path.join(__dirname,'views'));

sequelize.sync().then(() => {
   console.log('Book table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
app.listen(3000,()=>{console.log('3000 dinlenir')});