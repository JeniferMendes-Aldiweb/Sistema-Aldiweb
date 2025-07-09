require('dotenv').config();
const db = require('../db_Querys/bd');
const connect = db.connect

//GERENCIAMENTO DE LEADS
async function selectZLeads() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM ZLEADS;');
    return rows;
}
async function selectZLeadsCnpj(cnpj_cpf) {
    const conn = await connect();
    const leads = await conn.query('SELECT * FROM ZLEADS WHERE CGCCFO = ?', cnpj_cpf);
    return leads;
}
async function selectZLeadsID(id) {
    const conn = await connect();
    const leads = await conn.query('SELECT * FROM ZLEADS WHERE IDLEADS = ?', id);
    return leads;
}
async function insertZLeads(leads) {
    const conn = await connect();
    const sql = 'INSERT INTO ZLEADS ( NOMEFANTASIA, NOME, CGCCFO, INSCRESTADUAL, PAGREC, RUA, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, CODETD, CEP, TELEFONE, RUAPGTO, NUMEROPGTO, COMPLEMENTOPGTO, BAIRROPGTO, CIDADEPGTO, CODETDPGTO, CEPPGTO, TELEFONEPAGTO, RUAENTREGA, NUMEROENTREGA, COMPLEMENTOENTREGA, BAIRROENTREGA, CIDADEENTREGA, CODETDENTREGA, CEPENTREGA, TELEFONEENTREGA, EMAIL, ATIVO, INSCRMUNICIPAL, PESSOAFISOUJUR, PAIS, PAISPGTO, PAISENTREGA ,EMAILENTREGA, EMAILPGTO, CODMUNICIPIOPGTO, CODMUNICIPIOENTREGA, DTCRIACAO, DTMODIFICACAO ,USUARIOCRIACAO ,USUARIOALTERACAO ,TIPOCLIENTE ,ETAPA)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    const values = [leads.nomefantasia, leads.nome, leads.cgccfo, leads.inscrestadual, leads.pagrec, leads.rua, leads.numero, leads.complemento, leads.bairro, leads.cidade, leads.codetd, leads.cep, leads.telefone, leads.ruapgto, leads.numeropgto, leads.complementopgto, leads.bairropgto, leads.cidadepgto, leads.codetdpgto, leads.ceppgto, leads.telefonepgto, leads.ruaentrega, leads.numeroentrega, leads.complementoentrega, leads.bairroentrega, leads.cidadeentrega, leads.codetdentrega, leads.cepentrega, leads.telefoneentrega, leads.email, leads.ativo, leads.inscrmunicipal, leads.pessoafisoujur, leads.pais, leads.paispgto, leads.paisentrega, leads.emailentrega, leads.emailpgto, leads.codmunicipiopgto, leads.codmunicipioentrega, leads.dtcriacao, leads.dtmodificacao, leads.usuariocriacao, leads.usuarioalteracao, leads.tipocliente, leads.etapa];
    await conn.query(sql, values);
}
async function updateZLeads(id, leads) {
    const conn = await connect();
    const sql = 'UPDATE ZLEADS SET NOMEFANTASIA=?, NOME=?, CGCCFO=?, INSCRESTADUAL=?, PAGREC=?, RUA=?, NUMERO=?, COMPLEMENTO=?, BAIRRO=?, CIDADE=?, CODETD=?, CEP=?, TELEFONE=?, RUAPGTO=?, NUMEROPGTO=?, COMPLEMENTOPGTO=?, BAIRROPGTO=?, CIDADEPGTO=?, CODETDPGTO=?, CEPPGTO=?, TELEFONEPAGTO=?, RUAENTREGA=?, NUMEROENTREGA=?, COMPLEMENTOENTREGA=?, BAIRROENTREGA=?, CIDADEENTREGA=?, CODETDENTREGA=?, CEPENTREGA=?, TELEFONEENTREGA=?, EMAIL=?, ATIVO=?, INSCRMUNICIPAL=?, PESSOAFISOUJUR=?, PAIS=?, PAISPGTO=?, PAISENTREGA=?, EMAILENTREGA=?, EMAILPGTO=?, CODMUNICIPIOPGTO=?, CODMUNICIPIOENTREGA=?, DTMODIFICACAO=?, USUARIOALTERACAO=?, TIPOCLIENTE=?, ETAPA=? WHERE IDLEADS = ?';
    const values = [leads.nomefantasia, leads.nome, leads.cgccfo, leads.inscrestadual, leads.pagrec, leads.rua, leads.numero, leads.complemento, leads.bairro, leads.cidade, leads.codetd, leads.cep, leads.telefone, leads.ruapgto, leads.numeropgto, leads.complementopgto, leads.bairropgto, leads.cidadepgto, leads.codetdpgto, leads.ceppgto, leads.telefonepgto, leads.ruaentrega, leads.numeroentrega, leads.complementoentrega, leads.bairroentrega, leads.cidadeentrega, leads.codetdentrega, leads.cepentrega, leads.telefoneentrega, leads.email, leads.ativo, leads.inscrmunicipal, leads.pessoafisoujur, leads.pais, leads.paispgto, leads.paisentrega, leads.emailentrega, leads.emailpgto, leads.codmunicipiopgto, leads.codmunicipioentrega, leads.dtmodificacao, leads.usuarioalteracao, leads.tipocliente, leads.etapa, id];
    return await conn.query(sql, values);
}
async function deleteZLeads(id) {
    const conn = await connect();
    const sql = 'DELETE FROM ZLEADS WHERE IDLEADS=?;';
    const values = [id];
    return await conn.query(sql, values);
}
  async function updateALeadsEtapa(idleads, etapa) {
    const conn = await connect();
    const sql ="UPDATE ZLEADS SET ETAPA=? WHERE IDLEADS=?;"
    const values = [
      etapa,
      idleads
    ];
    return await conn.query(sql, values); 
  }

//EXPORTANDO QUERY
module.exports = {
selectZLeads,selectZLeadsCnpj,selectZLeadsID,insertZLeads,updateZLeads,deleteZLeads,updateALeadsEtapa
};