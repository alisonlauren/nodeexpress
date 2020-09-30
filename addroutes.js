//core http module
const http = require('http'); 
//3rd party module
const express = require('express'); 
//name to the express module
const app = express();
//requiring that it pulls from data, eventually
// const data = require('./data'); 
const hostname = '127.0.0.1'; //localhost name, our computer
const port = 3000; //port to run server on
//use app to handle service requests

const server = http.createServer(app); //using app to handle service requests

//homepage route that will just show the string hello world
app.get('/', (req, res) => {
    // sends back html h1 tag
    res.send('<h1>Hello World</h1>')
    })
//cats page, and the h1 will read MEOW
app.get('/cats', (req, res) => {
    // sends back html h1 tag
    res.send('<h1>"MEOW"</h1>')
    })
//dogs page that will print a string of WOOF when you get to the page
app.get('/dogs', (req, res) => {
    // sends back html h1 tag
    res.send('<h1>"WOOF!!"</h1>')
    })
//page for cats and dogs that will print a string on the heading
app.get('/cats_and_dogs', (req, res) => {
    // sends back html h1 tag
    res.send('<h1>Dogs and cats living together...mass hysteria!!</h1>')
    })

// start listening on the given port and hostname
server.listen(port, hostname, () => {
    // once server is listening, log to the console to say so
    console.log(`Server running at http://${hostname}:${port}/`);
    });