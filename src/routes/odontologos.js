const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

router.get("/odontologo", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM drteeth.odontologo",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/odontolog/:word", (req, res) => {
  const { word } = req.params;
  mysqlConnection.query(
    "SELECT * FROM drteeth.administrador WHERE nombre REGEXP ?  or apellido REGEXP ?;",
    [word,word],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
