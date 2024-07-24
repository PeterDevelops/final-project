// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

// Routes for each resource
// Example:
// const usersRoutes = require('./routes/users');

// Mount all resource routes
// Example:
// app.use('/users', usersRoutes);

// temp route to set up server
// Create the rest of the routes in routes folder
app.get("/greeting", (req, res) => {
  res.json({ message: 'Hello World!!!' })
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
