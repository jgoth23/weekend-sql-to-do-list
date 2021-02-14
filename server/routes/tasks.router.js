const express = require('express');

//create new router
//direct traffic to correct endpoint
const router = express.Router();

const pool = new pg.Pool({
  database: 'weekend_to_do_app',
  host: 'localhost',
  port: '5432',
});

router.get ('/tasks', (req, res) => {
  res.send(weekendToDoApp);
});

router.post('/tasks', (req, res) => {
  weekendToDoApp.push(req.body);
  res.sendStatus(200);
})

module.exports = router;
