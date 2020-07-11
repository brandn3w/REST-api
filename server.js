const express = require('express');
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//STATIC
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/build/index.html')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// if (process.env.NODE_ENV === "production") {
//   // get directory where is index.html
//   const root = path.join(__dirname, 'client', 'build');
//   //express.use static with the directory
//   app.use(express.static(root));
//   //express get request any (*) root, please use file that is on root directory configure above.
//   app.get("*", (req, res) => {
//     res.sendFile('index.html', { root });
//   });

//}
// else {
//   app.use(express.static(path.join(__dirname, '/client/build/index.html')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
//   });
// }

//Dynamic Api

app.use('/api/', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

