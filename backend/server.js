// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes for each resource
// Example:
// const usersRoutes = require('./routes/users');
const productsRoute = require("./routes/products");
const vendorsRoute = require("./routes/vendors");
const locationsRoute = require("./routes/locations");
const categoriesRoute = require("./routes/categories");
const cartsRoute = require("./routes/carts");
const ordersRoute = require("./routes/orders");
const loginRoute = require("./routes/login")
const logoutRoute = require("./routes/logout")
const stripeRoute = require("./routes/stripe");

// Mount all resource routes - the route paths will always start the path provided as the first argument below
// Example:
// app.use('/users', usersRoutes);
app.use("/api/products", productsRoute);
app.use("/api/vendors", vendorsRoute);
app.use("/api/locations", locationsRoute);
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/categories", categoriesRoute);
app.use("/api/cart", cartsRoute);
app.use("/api/orders", ordersRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/api/stripe", stripeRoute);


// temp route to set up server
// Create the rest of the routes in routes folder
app.get("/api", (req, res) => {
  res.json({ message: 'Hello World!!!' })
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
