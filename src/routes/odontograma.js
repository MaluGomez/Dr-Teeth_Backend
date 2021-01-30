const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


router.get("/Odontograma/:id", (req, res) => {
    const { id} = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Odontograma WHERE idPaciente = ?;",
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
router.post("/Odontograma", (req, res) => {
    const {idOdontograma, vestibular, lingual, mesial, ocusal, distal, dienteSup, dienteInf, dienteLecheSup, dienteLecheInf, idPaciente} = req.body;
    const query = `
          SET @idOdontograma= ?;
          SET @vestibular = ?;
          SET @lingual = ?;
          SET @mesial = ?;
          SET @ocusal= ?;
          SET @distal = ?;
          SET @dienteSup = ?;
          SET @dienteInf = ?;
          SET @dienteLecheSup = ?;
          SET @dienteLecheInf = ?;
          SET @idPaciente = ?;
          
          
          CALL newaddoreditOdontograma(@idOdontograma, @vestibular, @lingual, @mesial, @ocusal, @distal, @dienteSup, @dienteInf, @dienteLecheSup, @dienteLecheInf,  @idPaciente);`;
    mysqlConnection.query(
      query,
      [idOdontograma, vestibular, lingual, mesial, ocusal, distal, dienteSup, dienteInf, dienteLecheSup, dienteLecheInf, idPaciente],
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

//EDIT--------------------------------------------------------------------------------------------------------------------------------------------------

router.put('/Odontograma/:id', (req, res) => {
    const {vestibular, lingual, mesial, ocusal, distal, dienteSup, dienteInf, dienteLecheSup, dienteLecheInf, idPaciente } = req.body;
    const { id } = req.params;
    const query = `
          SET @idOdontograma= ?;
          SET @vestibular = ?;
          SET @lingual = ?;
          SET @mesial = ?;
          SET @ocusal= ?;
          SET @distal = ?;
          SET @dienteSup = ?;
          SET @dienteInf = ?;
          SET @dienteLecheSup = ?;
          SET @dienteLecheInf = ?;
          SET @idPaciente = ?;
          
          
          CALL newaddoreditOdontograma(@idOdontograma, @vestibular, @lingual, @mesial, @ocusal, @distal, @dienteSup, @dienteInf, @dienteLecheSup, @dienteLecheInf,  @idPaciente);`;
    mysqlConnection.query(query, [id, vestibular, lingual, mesial, ocusal, distal, dienteSup, dienteInf, dienteLecheSup, dienteLecheInf, idPaciente], (err) => {
      if(!err) {
        res.json({status: 'Se actualizo correctamente el registro '});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;