//handlebars and express variables will typically be in every node express server

// Initialize express
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');  // require handlebars
const Handlebars = require('handlebars');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); //old handlebars


// body parser lets you view data coming in from a post request (prolly in terminal)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //this line has to be after initalizing express var but before the route functions

//variable to access our models for db
const models = require('./db/models');
  
//handlebar formats for the html pages
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));    //Use "main.handlebars" as our default page layout
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', 'handlebars');                           //Use handlebars to render


//sample events, to delete eventually
var events = [
  { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

//home page displaying current events from DB
app.get('/', (req, res) => {
  models.Event.findAll().then(events => {
    res.render('events-index', { events: events });
  })
})

//create new event model
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

// NEW event
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

//View an Event
app.get('/events/:id', (req, res) => {
  // Search for the event by its id that was passed in via req.params
  models.Event.findByPk(req.params.id).then((event) => {
    // If the id is for a valid event, show it
    res.render('events-show', { event: event })
  }).catch((err) => {
    // if they id was for an event not in our db, log an error
    console.log(err.message);
  })
})


// Choose a port to listen on
const port = 3000

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})