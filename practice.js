//Step One, apply the core module you intend to use
const http = require('http');
//Step Two, apple the express module if intended to use it
const express = require('express');
//Step Three, if you're pulling an array from a different file, refrence the local module
const data = require('.data');
//Step Four, create a host name and a port
const hostname = '127.0.0.1'; // localhost (our computer)
const port = 3000;// port to run server on
//Step Five, create app that handles service requests
const app = http.createServer(app); 

//Step Six, now to create the home page!
// get from the app the homepage, expecting request, ready to provide response
app.get('/', (req, res) => {
    res.send(`<h1>"Hello World"</h1>`)
})

//Step Seven, create a function that will create pages for you for each element in list
app.get('/friends', (req, res) => {
    //Step Eight, set up an empty string for friends list
    let friends = '',
    //Step Nine, create a for loop
    for (let index = 0; index < data.length; index++) {
        const friend = data[index];
    //Step Ten, append html to the friend string for each friend in the data
    friends += `<li> a href="/friends/${friend.handle}">${friend.name}</a></li>"`
    }
    //Step Eleven, send back the list of friends
    res.send(`
    <ul>
    ${friends}
    </ul>
    `)
})

// Step Twelve, friend detail page (uses route parameters indicated by :handle )
app.get('/friends/:handle', (req, res) => {
    // Step Thirteen, destructure the route params to get the handle from the URL
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
    
    // handle all missing pages
    app.get('*', (req, res) => {
    res.status(404).send('404 - page not found')
    })
    
    // start listening on the given port and hostname
    server.listen(port, hostname, () => {
    // once server is listening, log to the console to say so
    console.log(`Server running at http://${hostname}:${port}/`);
    });




