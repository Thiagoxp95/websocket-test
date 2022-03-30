// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin:"http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port );
});

app.use(express.static(path.join(__dirname, 'public')));


io.on('connect', (socket) => {

  console.log("connectado");  

  setTimeout(() => {
    socket.emit('1234', {
      data: {
        message: 'Hello World',
        from: "VDR",
        amout: 1233
      }
    });
  });

});


