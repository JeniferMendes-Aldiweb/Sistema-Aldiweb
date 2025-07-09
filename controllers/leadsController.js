const db = require('../db_Querys/db_leads');
const { registerValidate, registerValidateUpdate } = require('./validates/LeadsValidate');




const leadsController = {
    select: async function (req, res) {
        let offset = req.query.offset;
        let limit = req.query.limit;
        let result = [];
        let leads = [];

        function estruturar(leads, offset, limit) {
            let indexLeads = parseInt(offset);

            if (!offset && !limit) {
                result = leads;
            } else {
                for (let index = 0; index < limit; index++) {

                    if (leads[indexLeads] !== undefined) {
                        result.push(leads[indexLeads])
                    }
                    indexLeads += 1;
                }
            }
        }
        try {
            leads = await db.selectZLeads();
            estruturar(leads, offset, limit)
            res.setHeader('Quantidades_Registros', leads.length);
            res.send(result);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectAll: async function (req, res) {
        let leads = [];

        try {
            leads = await db.selectZLeads();
            res.status(200).send(leads);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    selectId: async function (req, res) {
        try {
            let selectLeads = await db.selectZLeadsID(req.params.id);
            res.status(200).send(selectLeads[0]);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    register: async function (req, res) {

        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const selectLeads = await db.selectZLeadsCnpj(req.body.cgccfo);


        if (selectLeads[0] !== null && selectLeads[0].length > 0) {
            return res.status(400).send({ 'message': 'CNPJ já Existe!' });
        }

        const newLeads = new Object({
            nomefantasia: req.body.nomefantasia,
            nome: req.body.nome,
            cgccfo: req.body.cgccfo,
            inscrestadual: req.body.inscrestadual,
            pagrec: req.body.pagrec,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            codetd: req.body.codetd,
            cep: req.body.cep,
            telefone: req.body.telefone,

            ruapgto: req.body.ruapgto,
            numeropgto: req.body.numeropgto,
            complementopgto: req.body.complementopgto,
            bairropgto: req.body.bairropgto,
            cidadepgto: req.body.cidadepgto,
            codetdpgto: req.body.codetdpgto,
            ceppgto: req.body.ceppgto,
            telefonepgto: req.body.telefonepgto,

            ruaentrega: req.body.ruaentrega,
            numeroentrega: req.body.numeroentrega,
            complementoentrega: req.body.complementoentrega,
            bairroentrega: req.body.bairroentrega,
            cidadeentrega: req.body.cidadeentrega,
            codetdentrega: req.body.codetdentrega,
            cepentrega: req.body.cepentrega,
            telefoneentrega: req.body.telefoneentrega,

            email: req.body.email,
            ativo: req.body.ativo,
            inscrmunicipal: req.body.inscrmunicipal,
            pessoafisoujur: req.body.pessoafisoujur,
            pais: req.body.pais,
            paispgto: req.body.paispgto,
            paisentrega: req.body.paisentrega,
            emailentrega: req.body.emailentrega,
            emailpgto: req.body.emailpgto,

            codmunicipiopgto: req.body.codmunicipiopgto,
            codmunicipioentrega: req.body.codmunicipioentrega,
            dtcriacao: req.body.dtcriacao,
            dtmodificacao: req.body.dtmodificacao,
            usuariocriacao: req.body.usuariocriacao,
            usuarioalteracao: req.body.usuarioalteracao,
            tipocliente: req.body.tipocliente,
            etapa: req.body.etapa
        })

        try {
            const savedLeads = await db.insertZLeads(newLeads);
            res.status(200).send(savedLeads);
        } catch (error) {
            res.status(400).send(error)
        }

    },

    update: async function (req, res) {

        const { error } = registerValidateUpdate(req.body)
        if (error) { return res.status(400).send(error.message) };

        const selectLeads = await db.selectZLeadsCnpj(req.body.cgccfo);
        const LeadsAtual = await db.selectZLeadsID(req.body.idleads);


        if (selectLeads[0].length >= 1) {
            if (selectLeads[0][0].CGCCFO !== LeadsAtual[0][0].CGCCFO) {
                if (selectLeads[0] !== null && selectLeads[0].length >= 1) {
                    return res.status(400).send({ 'message': 'CNPJ já existe!' });
                }
            }
        }

        // if (selectLeads[0] !== null && selectLeads[0].length > 1) {
        //     return res.status(400).send({ 'message': 'CNPJ already exists' });
        // }

        const UpdateLeads = new Object({
            nomefantasia: req.body.nomefantasia,
            nome: req.body.nome,
            cgccfo: req.body.cgccfo,
            inscrestadual: req.body.inscrestadual,
            pagrec: req.body.pagrec,
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            codetd: req.body.codetd,
            cep: req.body.cep,
            telefone: req.body.telefone,

            ruapgto: req.body.ruapgto,
            numeropgto: req.body.numeropgto,
            complementopgto: req.body.complementopgto,
            bairropgto: req.body.bairropgto,
            cidadepgto: req.body.cidadepgto,
            codetdpgto: req.body.codetdpgto,
            ceppgto: req.body.ceppgto,
            telefonepgto: req.body.telefonepgto,

            ruaentrega: req.body.ruaentrega,
            numeroentrega: req.body.numeroentrega,
            complementoentrega: req.body.complementoentrega,
            bairroentrega: req.body.bairroentrega,
            cidadeentrega: req.body.cidadeentrega,
            codetdentrega: req.body.codetdentrega,
            cepentrega: req.body.cepentrega,
            telefoneentrega: req.body.telefoneentrega,

            email: req.body.email,
            ativo: req.body.ativo,
            inscrmunicipal: req.body.inscrmunicipal,
            pessoafisoujur: req.body.pessoafisoujur,
            pais: req.body.pais,
            paispgto: req.body.paispgto,
            paisentrega: req.body.paisentrega,
            emailentrega: req.body.emailentrega,
            emailpgto: req.body.emailpgto,

            codmunicipiopgto: req.body.codmunicipiopgto,
            codmunicipioentrega: req.body.codmunicipioentrega,
            dtmodificacao: req.body.dtmodificacao,
            usuarioalteracao: req.body.usuarioalteracao,
            tipocliente: req.body.tipocliente,
            etapa: req.body.etapa
        })

        try {
            const savedLeads = await db.updateZLeads(req.body.idleads, UpdateLeads);
            res.status(200).send(savedLeads);
        } catch (error) {
            res.status(400).send(error)
        }
    },

    delete: async function (req, res) {

        try {
            const delLeads = await db.deleteZLeads(req.params.id);
            res.status(200).send(delLeads);
        } catch (error) {                    
            res.status(400).send(error)
        }
    },
      updateEtapa: async function (req, res) {
        try {
          const savedLeads = await db.updateAProjetoTarefaEtapa(req.params.id,req.body.etapa);
          res.status(200).send(savedLeads);
        } catch (error) {
          res.status(400).send(error);
        }
}
}

module.exports = leadsController




