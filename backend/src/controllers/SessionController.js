const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const solicitante = await connection('solicitante')
            .where('id', id)
            .select('nome')
            .first();

        if (!solicitante) {
            return response.status(400).json({
                error: 'Solicitante não encontrado'
            });
        }

        return response.json(solicitante);
    }
}