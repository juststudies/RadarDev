const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const http = require('http');
const port = 3333

const routes = require('./routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PWD}@cluster0-amj44.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(()=>{
    console.log('foi o banco de dados');
}).catch(e=>{
    console.log(e);
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, (req, res)=>{
    console.log( `Escutando na porta: ${port}`);
});