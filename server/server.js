const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// ROUTES
//app.use('/weekendToDoApp', router)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});



