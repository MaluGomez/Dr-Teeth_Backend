const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

// LIST CITA FOR IDODONTOLOGO
router.get("/Cita/Odontologo/:idOdontologo", (req, res) => {
    const { idOdontologo } = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Cita  WHERE idOdontologo = ?",
      [idOdontologo],
      (err, rows) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
  });

// AGENDAR CITA ---- ME DIO PEREZA TRADUCIRLO IGUAL TODO ESTA EN ESPANINGLISH AJAJAJAJAJA 

router.post("/Cita", (req, res) => {
    const {nombrePaciente, apellidoPaciente, numDoc, fecha, hora, idPaciente, idOdontologo} = req.body;
    const query = `INSERT INTO Cita VALUE (?,?,?,?,?,?,?,?)`;
    mysqlConnection.query(
      query,
      [0,nombrePaciente, apellidoPaciente, numDoc, fecha, hora, idPaciente, idOdontologo],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha agendado correctamente una nueva cita Odontólogica",
          });
        } else {
          console.log(err);
        }
      }
    );
  });

// DELETE CITA
  router.delete("/Cita/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM proyecto_drteeth.Cita WHERE idCita = ?",
      [id],
      (err) => {
        if (!err) {
          res.json({ status: "Se ha eliminado correctamente la cita del paciente" });
        } else {
          console.log(err);
        }
      }
    );
  });


module.exports = router;


