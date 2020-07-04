const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];

app.get('/testimonials', (req, res) => {
    res.json(db);
  });

  app.get('/testimonials/:id', (req, res) => {
    res.json(db[Math.floor(Math.random() * db.length)]);
  });

  app.get('/testimonials/random', (req, res) => {
    res.json(db[req.params.id - 1]);
  });

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });


