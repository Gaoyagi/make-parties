//handlebars and express variables will typically be in every node express server

// Initialize express
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');  // require handlebars
const Handlebars = require('handlebars');
const methodOverride = require('method-override')

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); //old handlebars


// body parser lets you view data coming in from a post request (prolly in terminal)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //this line has to be after initalizing express var but before the route functions

//variable to access our models for db
const models = require('./db/models');

//require('/controllers/events')(app, models);
  
//handlebar formats for the html pages
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));    //Use "main.handlebars" as our default page layout
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);
app.set('view engine', 'handlebars');                           //Use handlebars to render

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))




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


//EVENT routes

//form to create a new even document
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    // Redirect to events/:id
    res.redirect(`/events/${event.id}`)

  }).catch((err) => {
    console.log(err)
  });
})

//posts new event
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

//View an Event
app.get('/events/:id', (req, res) => {
  console.log("here")
  models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
      res.render('events-show', { event: event });
  }).catch((err) => {
      console.log(err.message);
  })
});

//edit an event
app.get('/events/:id/edit', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-edit', { event: event });
  }).catch((err) => {
    console.log(err.message);
  })
});

//update the event document (PUT request)
app.put('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.update(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

//delete an event
app.delete('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.destroy();
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err);
  });
})


//RSVP Routes

//link to form to create a new reservation document
app.get('/events/:eventId/rsvps/new', (req, res) => {
  models.Event.findByPk(req.params.eventId).then(event => {
    res.render('rsvps-new', { event: event });
  });
});

//posts the reservation document to dat
app.post('/events/:eventId/rsvps', (req, res) => {
  req.body.EventId = req.params.eventId;
  models.Rsvp.create(req.body).then(rsvp => {
    res.redirect(`/events/${req.params.eventId}`);
  }).catch((err) => {
      console.log(err)
  });
});

//delete reservation document
app.delete('/events/:eventId/rsvps/:id', (req, res) => {
  models.Rsvp.findByPk(req.params.id).then(rsvp => {
      rsvp.destroy();
      res.redirect(`/events/${req.params.eventId}`);
  }).catch((err) => {
      console.log(err);
  });
});

// Choose a port to listen on
const port = 3000

// Tell the app what port to listen on
app.listen(process.env.PORT ||port, () => console.log(`Example app listening on port ${port}!`))