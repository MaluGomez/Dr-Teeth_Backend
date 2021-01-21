const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

router.post("/Auth", (req, res) => {
    let pass = req.body.password
    let userEmail = req.body.user
    console.log(req.body, ' -- ', userEmail, ' -- ', pass)
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Administrador WHERE email = ? AND contrasena = ?;",[userEmail, pass],
      (err, rows, fields) => {
        if (!err) {
            res.json(rows.length > 0 ? rows : { mesagge: "Usuario o contraseña incorrecta!" });
        } else {
          console.log(err);
        }
      }
    );
  });


  module.exports = router;
