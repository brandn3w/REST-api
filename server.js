const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoClient = require('mongodb').MongoClient;
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//STATIC
  // get directory where is index.html
const root = path.join(__dirname, 'client', 'build');
  //express.use static with the directory
app.use(express.static(root));
  //express get request any (*) root, please use file that is on root directory configure above.
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
  });

//Dynamic Api

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');
  }
}

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

