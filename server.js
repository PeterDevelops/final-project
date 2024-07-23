// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

// Routes for each resource
// Example:
// const usersRoutes = require('./routes/users');

// Mount all resource routes
// Example:
// app.use('/users', usersRoutes);

app.get("/", (req, res) => {
  res.redirect("/index");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
