const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database");

router.get('/historico/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM historico WHERE idPaciente = ?`
    mysqlConnection.query(
        query, [id],
        (err, rows) => {
          if (!err) {
            res.json(rows);
          } else { 
            console.log(err);
          }
        }
      );
})

router.post('/historico', (req, res) => {
    const {historico, idPaciente} = req.body;
    const query = `INSERT INTO historico VALUES (?,?,?)`
    mysqlConnection.query(
        query, [0, JSON.stringify(historico), idPaciente],
        (err, rows) => {
          if (!err) {
            res.json({
              status: "Se ha guardado correctamente el registro",
            });
          } else {
            console.log(err);
          }
        }
      );
})

router.put('/historico', (req, res) => {
    const {idHistorico, historico} = req.body;
    const query = `UPDATE historico SET historia = ? WHERE idhistorico = ?`
    mysqlConnection.query(
        query, [JSON.stringify(historico), idHistorico],
        (err, rows) => {
          if (!err) {
            res.json({
              status: "Se ha actualizo correctamente el registro",
            });
          } else {
            console.log(err);
          }
        }
      );
})

module.exports = router;