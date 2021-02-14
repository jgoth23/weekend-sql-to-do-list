const express = require('express');
const pool = require('../modules/pool');
//create new router
//direct traffic to correct endpoint
const router = express.Router();



router.get('/', (req, res) => {
  //res.send(weekendToDoApp);
  pool.query('SELECT * FROM "tasks"')
  .then(function (dbRes) {
    console.log(dbRes.rows);
    res.send(dbRes.rows)
    
    })
    .catch(function (err) {
      console.log(err);
  });
});

router.post('/', (req, res) => {
  //weekendToDoApp.push(req.body);
  res.sendStatus(200);
  pool.query(`'INSERT INTO "tasks" ("todo", "importance", "rank", "notes", "completed")
('${req.body.todo}', '${req.body.importance}', '${req.body.rank}', '${req.body.notes}', '${req.body.completed}');`);
});

module.exports = router;
