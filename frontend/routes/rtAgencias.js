var express = require('express');
var router = express.Router();
var AgenciasApp = require("../apps/agencias/controller/ctlAgencias")



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/ManutAgencias', authenticationMiddleware, AgenciasApp.manutAgencias)
router.get('/InsertAgencias', authenticationMiddleware, AgenciasApp.insertAgencias);
router.get('/ViewAgencias/:id', authenticationMiddleware, AgenciasApp.ViewAgencias);
router.get('/UpdateAgencias/:id', authenticationMiddleware, AgenciasApp.UpdateAgencia);

/* POST métodos */
router.post('/InsertAgencias', authenticationMiddleware, AgenciasApp.insertAgencias);
router.post('/UpdateAgencias', authenticationMiddleware, AgenciasApp.UpdateAgencia);
router.post('/DeleteAgencias', authenticationMiddleware, AgenciasApp.DeleteAgencia);
// router.post('/viewAgencias', authenticationMiddleware, AgenciasApp.viewAgencias);


module.exports = router;