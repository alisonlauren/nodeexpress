//core http module
const http = require('http'); 
//3rd party module
const express = require('express'); 
//name to the express module
const app = express();
//requiring that it pulls from data, eventually
// const data = require('./data'); 
const hostname = '127.0.0.2'; //localhost name, our computer
const port = 3000; //port to run server on
//use app to handle service requests
const data = require('./olddata'); // local data module which will be used in a second

const server = http.createServer(app); //using app to handle service requests
//regular homepage, where they will see a heading of hello world
app.get('/', (req, res) => {
    res.send('Hello World!');
//pulling from the friends object that is held within the /olddata file 
//in which i required... expecting requesting, preparing for response
app.get('/friends/:handle', (req, res) => {
    // setting variable for handle = the request parameters
    const { handle } = req.params;
    //our response? put hello handle name in the h1 element
    res.send(`<h1>Hello, ${handle}!</h1>`);
});
//listening for port and hostname
server.listen(port, hostname, () => {
    //and once retrieved print server running hostname and port
    console.log(`Server running at http://${hostname}:${port}/`);
});