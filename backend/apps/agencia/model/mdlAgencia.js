const db = require("../../../database/databaseconfig");

// Buscar todas as agências
const getAllAgencia = async () => {
  return (
    await db.query(
      "SELECT * FROM agencias WHERE removido = false ORDER BY nome ASC"
    )
  ).rows;
};

// Buscar uma agência pelo ID
const getAgenciaByID = async (agenciaIDPar) => {
  return (
    await db.query(
      "SELECT * FROM agencias WHERE agenciaid = $1 AND removido = false",
      [agenciaIDPar]
    )
  ).rows;
};

// Inserir uma nova agência
const insertAgencia = async (agenciaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO agencias (nome, endereco, telefone, email, data_criacao, orcamento) " +
        "VALUES ($1, $2, $3, $4, $5, $6)",
        [
          agenciaREGPar.nome,
          agenciaREGPar.endereco,
          agenciaREGPar.telefone,
          agenciaREGPar.email,
          agenciaREGPar.data_criacao,
          agenciaREGPar.orcamento
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencia|insertAgencia] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Atualizar uma agência existente
const updateAgencia = async (agenciaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    const result = await db.query(
      "UPDATE agencias SET " +
        "nome = $2, " +
        "endereco = $3, " +
        "telefone = $4, " +
        "email = $5, " +
        "data_criacao = $6, " +
        "orcamento = $7 " +
        "WHERE agenciaid = $1",
      [
        agenciaREGPar.agenciaid,
        agenciaREGPar.nome,
        agenciaREGPar.endereco,
        agenciaREGPar.telefone,
        agenciaREGPar.email,
        agenciaREGPar.data_criacao,
        agenciaREGPar.orcamento,
      ]
    );
    linhasAfetadas = result.rowCount;
  } catch (error) {
    console.error("Erro ao atualizar agência:", error);
    msg = "[mdlAgencia|updateAgencia] " + (error.detail || error.message || "Erro desconhecido");
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Marcar uma agência como removida
const deleteAgencia = async (agenciaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE agencias SET removido = true WHERE agenciaid = $1",
        [agenciaREGPar.agenciaid]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAgencia|deleteAgencia] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllAgencia,
  getAgenciaByID,
  insertAgencia,
  updateAgencia,
  deleteAgencia,
};
