require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')


// Settings
const PORT = process.env.PORT || 3304;

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use(require('./routes/admins'));
app.use(require('./routes/odontologos'));
app.use(require('./routes/pacientes'));
app.use(require('./routes/Login'));
app.use(require('./routes/acudientes'));
app.use(require('./routes/antecedentes'));
app.use(require('./routes/asistente'));
app.use(require('./routes/cita'));
app.use(require('./routes/tratamiento'));
app.use(require('./routes/odontograma'));
app.use(require('./routes/consulta'));
app.use(require('./routes/historico'));




// Starting the server
app.listen(PORT, function () {
  console.log(`La aplicación arrancó en http://localhost:${PORT}`);
});

