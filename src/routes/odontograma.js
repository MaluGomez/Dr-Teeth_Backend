const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


router.get("/Odontograma/:id", (req, res) => {
    const { id } = req.params;
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
    const {dienteSup, dienteInf, dientesLecheSup, dientesLecheInf, diagnostico, planTratamiento, idPaciente} = req.body;
    const query = `INSERT INTO Odontograma VALUES (?,?,?,?,?,?,?,?)`;
    mysqlConnection.query(
      query, [0, JSON.stringify(dienteSup), JSON.stringify(dienteInf), JSON.stringify(dientesLecheSup), JSON.stringify(dientesLecheInf), diagnostico, planTratamiento, idPaciente],
      (err, rows) => {
        if (!err) {
          console.log(rows)
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

router.put('/Odontograma', (req, res) => {
  const {idOdontograma, dienteSup, dienteInf, dientesLecheSup, dientesLecheInf, diagnostico, planTratamiento} = req.body;
    const query = `UPDATE Odontograma SET 
    dienteSup = ?,
    dienteInf = ?,
    dienteLecheSup = ?,
    dienteLecheInf = ?,
    diagnostico = ?,
    planTratamiento = ?
    WHERE idOdontograma = ?;`;
    mysqlConnection.query(query,
      [
        JSON.stringify(dienteSup),
        JSON.stringify(dienteInf),
        JSON.stringify(dientesLecheSup),
        JSON.stringify(dientesLecheInf),
        diagnostico,
        planTratamiento,
        idOdontograma], (err) => {
      if(!err) {
        res.json({status: 'Se actualizo correctamente el registro '});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;