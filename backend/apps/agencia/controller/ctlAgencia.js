const mdlAgencia = require("../model/mdlAgencia");

const getAllAgencia = (req, res) =>
  (async () => {
    let registro = await mdlAgencia.getAllAgencia();
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.data_criacao.toISOString().split("T")[0];
      row.data_criacao = formattedDate;
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getAgenciaByID = (req, res) =>
  (async () => {
    const agenciaID = parseInt(req.body.agenciaid);
    let registro = await mdlAgencia.getAgenciaByID(agenciaID);
    const formattedDate = registro[0].data_criacao.toISOString().split("T")[0];
    registro[0].data_criacao = formattedDate;
    res.json({ status: "ok", "registro": registro });
  })();

const insertAgencia = (request, res) =>
  (async () => {
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.insertAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateAgencia = (request, res) =>
  (async () => {
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.updateAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const DeleteAgencia = (request, res) =>
  (async () => {
    const agenciaREG = request.body;
    let { msg, linhasAfetadas } = await mdlAgencia.deleteAgencia(agenciaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAgencia,
  getAgenciaByID,
  insertAgencia,
  updateAgencia,
  DeleteAgencia
};