const http = require('http'); // core http module
const express = require('express'); // 3rd party express module
const bodyParser = require('body-parser') // 3rd party body-parser module
const data = require('./data'); // local data module
const radLogger = require('./middleware/radlogger');

const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000; // port to run server on

const app = express(); // creating express app

const server = http.createServer(app); // use app to handle server requests

// look for static files in 'public' folder first
app.use(express.static('public'))

// parse json body into an object
app.use(bodyParser.json());

// parse url encoded body into an object
app.use(bodyParser.urlencoded({ extended: true }));

// use our logging middleware on all routes
app.use(radLogger);

// // must have ?awesome=true on url to access /friends routes
// app.use('/friends*',(req, res, next) => {
//   // if the the query 'awesome' exists
//   if (req.query.awesome) {
//     // log it and move on to the next request
//     console.log('AWESOME REQUEST!')
//     next()
//   } else {
//     // otherwise, tell express there is an error
//     // by passing something to the 'next' function
//     next('REQUEST NOT AWESOME');
//   }
// })

// homepage route
app.get('/', (req, res) => {
// get name from query parameters
// (default to 'World' if no 'name' query param exists)
const name = req.query.name || 'World';
// sends back html h1 tag
res.send(`<h1>Hello, ${name}</h1>`)
})

// about page
app.get('/about', (req, res) => {
// send back h1 for about page
res.send('<h1>About page</h1>')
})

// friends list
app.get('/friends', (req, res) => {
// set up empty string
let friends = '';
// loop over each item in the data
for (let index = 0; index < data.length; index++) {
const friend = data[index];
// append html to the friend string for each friend in the data
friends += `<li><a href="/friends/${friend.handle}">${friend.name}</a></li>`
}
// send back the list of friends
res.send(`
<ul>
${friends}
</ul>
`)
})

app.get('/year', (req, res) => {
const { age } = req.query;
const year = 2020;
const calcAge = year - parseInt(age, 10);
res.send(`You were born in ${calcAge}`);
})

// friend detail page (uses route parameters indicated by :handle )
app.get('/friends/:handle', (req, res) => {
// destructure the route params to get the handle from the URL
const { handle } = req.params;

// find the first friend in the data that matches the route param 'handle'
const friend = data.find(element => {
if (element.handle === handle) {
    return true;
}
return false;
})

  // if it couldn't find a friend
if (!friend) {
res
    .status(404) // set status to 404 (not found)
    // send back an error
    .send(`<h1>No friend found with handle: ${handle}</h1>`)
// if we did find a friend
} else {
// use the details to send back a page with their info
res.send(`
    <h1>${friend.name}</h1>
    <h3>${friend.handle}</h3>
    <p>${friend.skill}</p>
`)
}
})

app.get('/api/friends', (req, res) => {
res.json(data);
})

app.get('/api/friends/:handle', (req, res) => {
const { handle } = req.params;

const friend = data.find(element => {
if (element.handle === handle) {
    return true;
}
return false;
})

if (!friend) {
res.status(404).json()
} else {
res.json(friend);
}
})

app.post('/api/friends', (req, res) => {
console.log(req);
if (!req.body.name || !req.body.handle || !req.body.skill) {
res.status(422).json()
}
const newFriend = {
name: req.body.name,
handle: req.body.handle,
skill: req.body.skill,
}
data.push(newFriend)
res.status(201).json()
})

app.delete('/api/friends/:handle', (req, res) => {
const { handle } = req.params;

const friendIndex = data.findIndex(element => {
if (element.handle === handle) {
    return true;
}
return false;
})

if (friendIndex === -1) {
res.status(404).json();
} else {
data.splice(friendIndex, 1);
res.status(204).json()
}
})

app.put('/api/friends/:handle', (req, res) => {
const { handle } = req.params;

const friendIndex = data.findIndex(element => {
if (element.handle === handle) {
    return true;
}
return false;
})

if (!req.body.name || !req.body.handle || !req.body.skill) {
res.status(422).json()
}
const newFriend = {
name: req.body.name,
handle: req.body.handle,
skill: req.body.skill,
}

if (friendIndex === -1) {
res.status(404).json();
} else {
data.splice(friendIndex, 1, newFriend);
res.status(202).json()
}
})

// handle all missing pages
app.get('*', (req, res) => {
res.status(404).send('404 - page not found')
})

// start listening on the given port and hostname
server.listen(port, hostname, () => {
// once server is listening, log to the console to say so
console.log(`Server running at http://${hostname}:${port}/`);
});