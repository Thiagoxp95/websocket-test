const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const IO_CONFIG ={
  cors: {
    origin:"http://localhost:3000",
    methods: "GET",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  } 
}
const io = require('socket.io')(server, IO_CONFIG);

app.post('/v1/alerts', (req, res) => {
  const {token,patron, message, amount} = req.body;

  io.emit(token, { message, patron, amount});

  res.status(200).send({message: 'success'});
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));






