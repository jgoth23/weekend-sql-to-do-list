const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//create new router
//direct traffic to correct endpoint



router.get('/', (req, res) => {
  //res.send(weekendToDoApp);
  pool.query(`SELECT * FROM "tasks"`)
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
  console.log(req.body);
  
  pool.query(`INSERT INTO "tasks" ("todo", "importance", "rank", "notes") VALUES
('${req.body.todo}', '${req.body.importance}', '${req.body.rank}', '${req.body.notes}');`)
.then(function (dbRes) {
  res.sendStatus(201);
})
.catch(function (err) {
  console.log('err', err)
  res.sendStatus(500);
})

});

module.exports = router;
