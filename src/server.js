const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

mongoose.connect('mongodb+srv://omnistack:q1w2e3@omnistack-oanhs.mongodb.net/curso?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //para importar arquivos de pdf, img etc
app.use(routes);


server.listen(3333);

