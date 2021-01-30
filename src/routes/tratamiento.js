const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


router.get("/Tratamiento/:id", (req, res) => {
    const { id} = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Tratamiento WHERE idPaciente = ?;",
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

// ADD TRATAMIENTO

router.post("/Tratamiento", (req, res) => {
    const {idTratamiento, motivoConsulta, observaciones, idPaciente} = req.body;
    const query = `
          SET @idTratamiento= ?;
          SET @motivoConsulta = ?;
          SET @observaciones = ?;
          SET @idPaciente = ?;
          
          
          
          CALL newaddoreditTratamiento(@idTratamiento, @motivoConsulta, @observaciones, @idPaciente);`;
    mysqlConnection.query(
      query,
      [idTratamiento, motivoConsulta, observaciones, idPaciente],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha guardado correctamente el nuevo tratamiento a seguir para el paciente",
          });
        } else {
          console.log(err);
        }
      }
    );
  });

//EDIT -----------------------------------------------------------------------------------

router.put('/Tratamiento/:id', (req, res) => {
    const {motivoConsulta, observaciones, idPaciente } = req.body;
    const { id } = req.params;
    const query = `
    SET @idTratamiento= ?;
    SET @motivoConsulta = ?;
    SET @observaciones = ?;
    SET @idPaciente = ?;
    
    
    CALL newaddoreditTratamiento(@idTratamiento, @motivoConsulta, @observaciones, @idPaciente);`;
    mysqlConnection.query(query, [id, motivoConsulta, observaciones, idPaciente], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Se actualizo correctamente el tratamiento del paciente '});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;