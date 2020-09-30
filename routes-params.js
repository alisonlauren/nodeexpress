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
});
//this will make it so that no matter how many names/handles/etc you're trying to handle,
//possible thousands+ depending on the site, do this same function to all of them on their page
//app will get, from the greet page, the handle of the user, expecting a 
//request and intending a response
app.get('/friends/:handle', (req, res) => {
    //naming handle variable to match the request parameters used by user
    const { handle } = req.params;
    //and enabling the response, hello handle name..
    res.send(`Hello, ${handle}!`);
});

// start listening on the given port and hostname
server.listen(port, hostname, () => {
    // once server is listening, log to the console to say so
    console.log(`Server running at http://${hostname}:${port}/`);
    });