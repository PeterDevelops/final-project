// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());
// prevents connection errors
app.use(cors());
app.use(express.json());

// Websocket set-up
const http = require('http');
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Routes for each resource
// Example:
// const usersRoutes = require('./routes/users');
const productsRoute = require("./routes/products");
const vendorsRoute = require("./routes/vendors");
const locationsRoute = require("./routes/locations");
const categoriesRoute = require("./routes/categories");
const ordersRoute = require("./routes/orders");
const loginRoute = require("./routes/login")
const logoutRoute = require("./routes/logout")
const chatsRoute = require("./routes/chats")
const messagesRoute = require("./routes/messages")

// Mount all resource routes - the route paths will always start the path provided as the first argument below
// Example:
// app.use('/users', usersRoutes);
app.use("/api/products", productsRoute);
app.use("/api/vendors", vendorsRoute);
app.use("/api/locations", locationsRoute);
app.use(express.static(path.join(__dirname, '../public')));
app.use("/api/categories", categoriesRoute);
app.use("/api/orders", ordersRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);


// temp route to set up server
// Create the rest of the routes in routes folder
app.get("/api", (req, res) => {
  res.json({ message: 'Hello World!!!' })
});

// update app. to server. to make it an http server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// websocket listen for client connection event
io.on("connection", (socket) => {
  console.log(`User connected to chat: ${socket.id}`);

  // listens for client joining a chat [should pull chat.id and load chat page with that data]
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat ${chatId}`)
  })

  //leave chat
  socket.on('leave_chat', (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.id} left chat ${chatId}`);
  });
  
// message: message, created_at: moment().toISOString(), sender_id: user.id, user: user

  //websocket server listening for a message
  socket.on("send_message", (data) => {
    console.log(`Received message: ${JSON.stringify(data)}`);
    socket.to(data.chatId).emit("receive_message", data);
    console.log(`Message sent to ${data.chatId}: ${data.message}`);
  });

  socket.on("disconnect", () => {
    // Remove event listeners on disconnect
    socket.removeAllListeners();
  });

}); 