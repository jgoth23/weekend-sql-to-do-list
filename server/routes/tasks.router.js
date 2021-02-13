const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');
//this option is required

// *** GET
router.get('/', (req, res) => {
  // do a DB query
  pool
    .query(
      `SELECT * FROM "tasks"
            ORDER BY "rank" ASC`
    )
    .then(function (dbRes) {
       console.log(dbRes.rows);
      // send all koalas to client
      res.send(dbRes.rows);
    })
    // or handle DB errors
    .catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
});

// *** POST
router.post('/', (req, res) => {
  /*
  Query should look like this:

  INSERT INTO "koalas"
    ("name", "gender", "age", "transfer", "notes")
  VALUES
    ('some artist', 'tracky', '1-1-1970', 7);

  */

  console.log('req.body', req.body);

  // do a DB query
  pool
    .query(
      `
    INSERT INTO "tasks"
    ("todo", "importance", "rank", "notes")
    VALUES
    ('${req.body.importance}', '${req.body.rank}', '${req.body.notes}');
    `
    )
    // could be .then(dbRes => {.... })
    .then(function (dbRes) {
      // console.log(dbRes.rows);
      res.sendStatus(201);
    })
    // or handle DB errors
    .catch(function (err) {
      console.log(err);
      // don't ghost your client!
      // send a status
      res.sendStatus(500);
    });
});

// PUT
// need to update the ready to transfer
router.put('/:id', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  let taskID = req.params.id;
  let sqlText = '';

  // let transfer = req.body.thisKoalaStatus;
  // console.log('transfer status', transfer);

  // if (transfer === 'TRUE') {
  //   sqlText = `UPDATE "koalas" SET "ready_to_transfer"='FALSE' WHERE id=$1`;
  // } else if (transfer === 'FALSE') {
  //   sqlText = `UPDATE "koalas" SET "ready_to_transfer"='TRUE' WHERE id=$1`;
  // } else {
  //   // If we don't get an expected direction, send back bad status
  //   console.log('Whoops');
  //   res.sendStatus(500);
  //   return; // Do it now, doesn't run the next set of code
  // }

  pool
    .query(sqlText, [tasksID])
    .then((dbRes) => {
      console.log(dbRes);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

// DELETE

module.exports = toDoRouter;
