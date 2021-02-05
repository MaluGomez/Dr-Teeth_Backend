const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");


//GET A ACUDIENTE
router.get("/Acudiente/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Acudiente WHERE idPaciente = ?;",
      [id],
      (err, rows) => {
        if (!err) {
          console.log(rows)
          res.json(rows);
        } else {
          console.log(err);
        }
      }
    );
});


// CREATE ACUDIENTE
router.post("/Acudiente", (req, res) => {
    const { nombres, apellidos, parentesco, telefono, idPaciente } = req.body;
    const query = `INSERT INTO Acudiente VALUES (?,?,?,?,?,?)`;
    mysqlConnection.query(
      query,
      [0, nombres, apellidos, parentesco, telefono, idPaciente],
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
      "DELETE FROM proyecto_drteeth.Acudiente WHERE idPaciente = ?",
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