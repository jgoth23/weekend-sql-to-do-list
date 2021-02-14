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

router.put('/:id', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  let taskID = req.params.id;
  let sqlText = '';

  let completed = req.body.thisTaskStatus;
  console.log('completion status', completed);

  if (completed === 'true') {
    sqlText = `UPDATE "tasks" SET "completed"=FALSE WHERE id=$1`;
  } else if (completed === 'false') {
    sqlText = `UPDATE "tasks" SET "completed"=TRUE WHERE id=$1`;
  } else {
    // If we don't get an expected direction, send back bad status
    console.log('Whoops');
    res.sendStatus(500);
    return; // Do it now, doesn't run the next set of code
  }

  pool
    .query(sqlText, [taskID])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  let taskID = req.params.id;
  console.log(taskID);
  pool.query(`DELETE FROM "tasks" WHERE "id"=$1;`, [taskID])
  .then((dbRes) => {
    console.log(dbRes);
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('error', err);
    res.sendStatus(500);
  });

})

module.exports = router;
