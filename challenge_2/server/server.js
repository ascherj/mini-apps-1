const express = require('express');
const bodyParser = require('body-parser');
const { generateCSV } = require('./utils');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client'));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
  const text = req.body.csv;
  console.log(req);
  const csv = generateCSV(text);
  res.send(csv);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
