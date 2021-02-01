const express = require("express");
const router = express.Router();

const mysqlConnection = require("../database");

  router.post("/Auth", (req, res) => {
    let pass = req.body.password   
    let userEmail = req.body.user
    console.log(req.body,'-- ', userEmail,'-- ', pass)
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Administrador WHERE email = ? AND contrasena = ?;",[userEmail, pass],
      (err, rows, fields) => {
        if (!err) {
          console.log(rows.length)
          if (rows.length == 0) {
            mysqlConnection.query(
              "SELECT * FROM proyecto_drteeth.Odontologo WHERE email = ? AND contrasena = ?;",[userEmail, pass],
              (err, rows, fields) => {
                res.json(rows.length > 0 ? rows : { mesagge: "Usuario o contraseña incorrecta! o no existe usuario!" });
              })
          } else {
            res.json(rows.length > 0 ? rows : { mesagge: "Usuario o contraseña incorrecta!" });
          }
        } else {
          console.log(err);
        }
      }
    );
  });

  module.exports = router;
