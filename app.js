const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const ibmiotf = require('./ibmiotf');

const app = express();

app.use(express.json({
  extended: true
}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/data', require('./routes/data.routes'));
app.use('/api/trip', require('./routes/trip.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = 5001;

async function start() {
  try {
    ibmiotf.connect();
    console.log('Connected to IBM IoT');
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log(PORT);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();

