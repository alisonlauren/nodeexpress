//core http module)
const http = require('http'); 
//3rd party module
const data = require('./olddata'); // local data module
const express = require('express'); 
const bodyParser = require('body-parser')
//name to the express module
const app = express();
//requiring that it pulls from data, eventually
// const data = require('./data'); 
const hostname = '127.0.0.1'; //localhost name, our computer
const port = 3000; //port to run server on
//use app to handle service requests
const server = http.createServer(app);
//homepage route, receiving request and preparing response
const radLogger = require('./middleware/radlogger')

const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000; // port to run server on


const app = express(); // creating express app

const server = http.createServer(app); // use app to handle server requests
//look in this folder, for that file
//makes that folder searcherable from the browser
//why make it public? because you want to some code to not be accessible
app.use(express.static('public'))
//otherwise the user would have to use a file path name

//parse json body into an object
app.use(bodyParser.json());

// parse url encoded body into an object
app.use(bodyParser)({ extended: true }));

//use our logging middleware
app.use(radLogger);

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
    
    // friend detail page (uses route parameters indicated by :handle )
    // app.get('/friends/:handle', (req, res) => {
    // // destructure the route params to get the handle from the URL
    // const { handle } = req.params;
    
    // // find the first friend in the data that matches the route param 'handle'
    // const friend = data.find(element => {
    // if (element.handle === handle) {
    //     return true;
    // }
    // return false;
    // })
    
    // // if it couldn't find a friend
    // if (!friend) {
    // res
    //     .status(404) // set status to 404 (not found)
    //     // send back an error
    //     .send(`<h1>No friend found with handle: ${handle}</h1>`)
    // if we did find a friend
    // } else {
    // // use the details to send back a page with their info
    // res.send(`
    //     <h1>${friend.name}</h1>
    //     <h3>${friend.handle}</h3>
    //     <p>${friend.skill}</p>
    // `)
    // }
    // })

    app.get('api/friends', (req, res) => {
        res.json(data)
    })

    app.get('/api/friend/:handle', (req, res) => {
    const { handle } = req.params;
    
        // find the first friend in the data that matches the route param 'handle'
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
    //read
    app.post('/api/friends', (req, res) => {
        //add in body types, formurlencoded and json, bodyParser
        //send data from client, i want to add new friend, when server receives request, adds to the data
        console.log(req.body);
        if (!req.body.name || !req.body.handle || !req.body.skill) {
            //422 ur fault you didnt get me the data i need 🤦🏼‍♀️
            res.status(422).json({
            })
        } 
        const newFriend = {
            name: req.body.name,
            handle: req.body.handle,
            skill: req.body.skill
        }
        data.push(newFriend);
        //need to send response
        //201 says successful and created, 200 just means successful
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
        //delete starting at FriendIndex, and just delete one.
            data.splice(friendIndex, 1);
        //204 means successfully deleted
            res.status(204).json()
     }
    })

    app.put('/api/friends/:handle', (req, res) => {
        const { handle } = req.params;

        const friendIndex = data.findIndex(element =>)
        

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

app.get('/', (req, res) => {
    //our response being hello world!
    res.send(`Hello World!`);
});
//asking the server to listen for the port and and hostname
server.listen(port, hostname, () => {
    //in which it will print the server is running at hostname and port in nice little string
    console.log(`Server running at http://${hostname}:${port}/`);
});



