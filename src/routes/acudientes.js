const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


//GET A ACUDIENTE
router.get("/Acudiente/:id", (req, res) => {
    const { id} = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Acudiente WHERE idPaciente = ?;",
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


// CREATE ACUDIENTE
router.post("/Acudiente", (req, res) => {
    const { idAcudiente, nombres, apellidos, parentesco, telefono, idPaciente } = req.body;
    const query = `
        SET @idAcudiente= ?;
        SET @nombres = ?;
        SET @apellidos = ?;
        SET @parentesco = ?;
        SET @telefono = ?;
        SET @idPaciente = ?;
        
        
        CALL newaddoreditAcudiente(@idAcudiente, @nombres, @apellidos, @parentesco, @telefono, @idPaciente);`;
    mysqlConnection.query(
      query,
      [idAcudiente, nombres, apellidos, parentesco, telefono, idPaciente],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha creado correctamente el nuevo acudiente",
          });
        } else {
          res.json({
            status: "Se ha producido un error al crear el acudiente!!!!",
          });
          console.log(err);
        }
      }
    );
  });


// DELETE ACUDIENTE

router.delete("/Acudiente/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM proyecto_drteeth.Acudiente WHERE idAcudiente = ?",
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