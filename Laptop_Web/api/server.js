'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require("mongoose");
const URI = process.env['MONGO_URI'];
const authRoute = require('./routes/auth');
const categoriesRoute = require('./routes/categories');
const laptopsRoute = require('./routes/laptops');
const ordersRoute = require('./routes/orders');
const pluginsRoute = require('./routes/plugins');
const usersRoute = require('./routes/users');
const main = require('./config/db/connection').main;
let app = express();
app.use(cors({ origin: '*' }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

main().catch(err => {
  console.log(err);
  throw new Error('Unable to connect to Database');
})

app.use("/api/admin/auth", authRoute);
app.use("/api/admin/categories", categoriesRoute);
app.use("/api/admin/laptops", laptopsRoute);
app.use("/api/admin/orders", ordersRoute);
app.use("/api/admin/plugins", pluginsRoute);
app.use("/api/admin/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});




const listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});