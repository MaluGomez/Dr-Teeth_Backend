const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


router.get("/Consulta/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Consulta WHERE idPaciente =? ;",
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


//ADD--------------------------------------------------
router.post("/Consulta", (req, res) => {
    const {idConsulta, diagnostico, planTratamiento, idPaciente, idOdontograma} = req.body;
    const query = `
          SET @idConsulta= ?;
          SET @diagnostico = ?;
          SET @planTratamiento = ?;
          SET @idPaciente = ?;
          SET @idOdontograma= ?;
          
          
          CALL newaddoreditOdontograma(@idConsulta, @diagnostico, @planTratamiento, @idPaciente, @idOdontograma);`;
    mysqlConnection.query(
      query,
      [idConsulta, diagnostico, planTratamiento, idPaciente, idOdontograma],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha guardado correctamente el registro",
          });
        } else {
          console.log(err);
        }
      }
    );
  });


module.exports = router;