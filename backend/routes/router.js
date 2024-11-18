const express = require("express");
const routerApp = express.Router();

const appAgencia = require("../apps/agencia/controller/ctlAgencia");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

//Rotas de Alunos
routerApp.get("/getAllAgencia", appLogin.AutenticaJWT, appAgencia.getAllAgencia);
routerApp.post("/getAgenciaByID", appLogin.AutenticaJWT, appAgencia.getAgenciaByID);
routerApp.post("/insertAgencia", appLogin.AutenticaJWT, appAgencia.insertAgencia);
routerApp.post("/updateAgencia", appLogin.AutenticaJWT, appAgencia.updateAgencia);
routerApp.post("/DeleteAgencia", appLogin.AutenticaJWT, appAgencia.DeleteAgencia);

/*
routerApp.get("/getAllAgencia", appAgencia.getAllAgencia);
routerApp.post("/getAgenciaByID", appAgencia.getAgenciaByID);
routerApp.post("/insertAgencia", appAgencia.insertAgencia);
routerApp.post("/updateAgencia", appAgencia.updateAgencia);
routerApp.post("/DeleteAgencia", appAgencia.DeleteAgencia);
*/

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;