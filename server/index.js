require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const {
  getEvents,
  getEventsByID,
  addEvent,
  deleteEvent,
  updateEvent
} = require(`${__dirname}/controllers/calendarCtrl`);

const { formatEmail } = require(`${__dirname}/controllers/emailCtrl`);

const port = 3001;

const app = express();

app.use(compression());
app.use(cors());
app.use(json());

app.get('/api/events', getEvents);
app.get('/api/events/:id', getEventsByID);
app.post('/api/events', addEvent, formatEmail);
app.delete('/api/event/:aux_id/:id', deleteEvent);
app.patch('/api/event/:aux_id/:id', updateEvent);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/../build`));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
  app.listen(port);
} else {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}
