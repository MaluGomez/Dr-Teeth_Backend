const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");



router.get("/Antecedente/:id", (req, res) => {
    const { id} = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Antecedente WHERE idPaciente = ?;",
      [id],
      (err, rows) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
});


//CREATE ANTECEDENTES
router.post("/Antecedente", (req, res) => {
    const { pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, observaciones, idPaciente} = req.body;
    const query = `INSERT INTO Antecedente VALUES (?,?,?,?,?,?,?,?,?)`;
    mysqlConnection.query(query,[ 0, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, observaciones, idPaciente],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha creado correctamente el nuevo antecedente del paciente",
          });
        } else {
          res.json({
            status: "Se ha producido un error al crear el antecedente del paciente!!!",
          });
          console.log(err);
        }
      }
    );
  });


router.delete("/Antecedente/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM proyecto_drteeth.Antecedente WHERE idPaciente = ?",
      [id],
      (err) => {
        if (!err) {
          res.json({ status: "Se ha borrado correctamente el registro del acudiente" });
        } else {
          console.log(err);
        }
      }
    );
  });


module.exports = router;