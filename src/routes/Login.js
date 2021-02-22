const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const mysqlConnection = require("../database");

  router.post("/Auth", (req, res) => {
    let pass = req.body.password      
    //pass.password = bcrypt.hashSync(pass, 10);
    let userEmail = req.body.user
    console.log(req.body,'-- ', userEmail,'-- ', pass)
    //bcrypt.hash(pass, 10, (err, hash) => 
    //{
   // if((bcrypt.compareSync(userEmail.user, pass.password)) ){
    mysqlConnection.query(
      "SELECT * FROM proyecto_drteeth.Administrador WHERE email = ? AND contrasena = ?;",[userEmail, pass], 
      (err, rows, fields) => {
        if (!err) { 
          //(bcrypt.compareSync(pass, userEmail.password))
          //(bcrypt.compareSync(userEmail.user, pass.password))
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
  });//});

  module.exports = router;
