//core http module
const http = require('http'); 
//3rd party module
const express = require('express'); 
//name to the express module
const app = express();
//requiring that it pulls from data, eventually
// const data = require('./data'); 
const hostname = '127.0.0.1'; //localhost name, our computer
const port = 3001; //port to run server on
//use app to handle service requests
const server = http.createServer(app);
//homepage route, receiving request and preparing response
app.get('/', (req, res) => {
    //our response being hello world!
    res.send(`Hello World!`);
});
//asking the server to listen for the port and and hostname
server.listen(port, hostname, () => {
    //in which it will print the server is running at hostname and port in nice little string
    console.log(`Server running at http://${hostname}:${port}/`);
});



