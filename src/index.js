require('dotenv').config();
const express = require('express');
const app = express();


// Settings
const PORT = process.env.PORT || 3304;

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/admins'));
app.use(require('./routes/odontologos'));
app.use(require('./routes/pacientes'));


// Starting the server
app.listen(PORT, function () {
  console.log(`La aplicación arrancó en http://localhost:${PORT}`);
});

