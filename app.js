// Initialize express
const express = require('express')
const app = express()

// require handlebars
var exphbs = require('express-handlebars');


//handlebars and express variables will typically be in every 



// INITIALIZE BODY-PARSER AND ADD IT TO APP
// body aprser lets you view data comign in from a post request (prolly in terminal)
const bodyParser = require('body-parser');

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));



var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]
  

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');



//index and events should be the same atm
app.get('/', (req, res) => {
    res.render('events-index', { events: events });
})

// INDEX
app.get('/events', (req, res) => {
    console.log(req.body);
})

// NEW event
app.get('/events/new', (req, res) => {
    res.render('events-new', {});
})



// Choose a port to listen on
const port = 3000

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})