const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");



// LIST ALL
router.get("/Asistente/:id", (req, res) => {
    const { id} = req.params;
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Asistente WHERE idOdontologo = ?;",
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


//CREATE ASISTENTE
router.post("/Asistente", (req, res) => {
    const { idAsistente, nombres, apellidos, telefono, idOdontologo } = req.body;
    const query = `
        SET @idAsistente= ?;
        SET @nombres = ?;
        SET @apellidos = ?;
        SET @telefono = ?;
        SET @idOdontologo = ?;
        
        
        CALL newaddoreditAsistente(@idAsistente, @nombres, @apellidos, @telefono, @idOdontologo);`;
    mysqlConnection.query(
      query,
      [idAsistente, nombres, apellidos, telefono, idOdontologo],
      (err) => {
        if (!err) {
          res.json({
            status: "Se ha creado correctamente el nuevo asistente",
          });
        } else {
          res.json({
            status: "Se ha producido un error al crear el asistente!!!",
          });
          console.log(err);
        }
      }
    );
  });


  router.delete("/Asistente/:id", (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
      "DELETE FROM proyecto_drteeth.Asistente WHERE idOdontologo = ?",
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