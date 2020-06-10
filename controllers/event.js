//events.js

module.exports = function (app, models) {
    //home page displaying current events from DB
    app.get('/', (req, res) => {
        models.Event.findAll().then(events => {
        res.render('events-index', { events: events });
        })
    })
}