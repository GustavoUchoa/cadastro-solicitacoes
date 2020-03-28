const cryto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const solicitantes = await connection('solicitante').select('*');

        return response.json(solicitantes);
    },

    async create(request, response) {
        const { nome, email, empresa, setor, dataCadastro } = request.body;
        const id = cryto.randomBytes(4).toString('HEX');

        await connection('solicitante').insert({
            id,
            nome,
            email,
            empresa,
            setor,
            dataCadastro
        });

        return response.json({ id });
    }
};