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
router.post("/Asistente", (req, res) => {
    const { idAntecedente, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, observacion, idPaciente} = req.body;
    const query = `
        SET @idAntecedente= ?;
        SET @pregunta1 = ?;
        SET @pregunta2 = ?;
        SET @pregunta3 = ?;
        SET @pregunta4 = ?;
        SET @pregunta5 = ?;
        SET @pregunta6 = ?;
        SET @observacion = ?;
        SET @idPaciente = ?;
        
        
        CALL newaddoreditAsistente(@idAntecedente, @pregunta1, @pregunta2, @pregunta3, @pregunta4, @pregunta5, @pregunta6, @observacion,@idPaciente);`;
    mysqlConnection.query(
      query,
      [idAntecedente, pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, observacion, idPaciente],
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