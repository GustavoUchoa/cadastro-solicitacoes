const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const solicitante_id = request.headers.authorization;

        const solicitacoes = await connection('solicitacao')
        .where('solicitante_id', solicitante_id)
        .select('*');

        return response.json(solicitacoes);
    }
}