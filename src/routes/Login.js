const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const mysqlConnection = require('../database');

router.post('/Auth', (req, res) => {
	let pass = req.body[0].password;
	let userEmail = req.body[0].user;
	console.log(req.body, '-- ', userEmail, '-- ', pass);
	mysqlConnection.query(
		'SELECT * FROM proyecto_drteeth.Administrador WHERE email = ?;',
		[userEmail],
		(err, rows, fields) => {
			if (!err) {
				if (rows.length == 0) {
					mysqlConnection.query(
						'SELECT * FROM proyecto_drteeth.Odontologo WHERE email = ?;',
						[userEmail],
						(err, rows, fields) => {
							if (rows.length > 0 && bcrypt.compareSync(pass, rows[0].contrasena)) {
								res.json(rows);
							} else {
								res.json({ mesagge: 'Usuario o Contraseña incorrecta!' });
							}
						}
					);
				} else {
					if (bcrypt.compareSync(pass, rows[0].contrasena)) {
						res.json(rows);
					} else {
						res.json({ mesagge: 'Contraseña incorrecta!' });
					}
				}
			} else {
				console.log(err);
			}
		}
	);
});

module.exports = router;
