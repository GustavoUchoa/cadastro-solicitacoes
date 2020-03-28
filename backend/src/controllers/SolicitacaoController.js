const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [total] = await connection('solicitacao').count();
        response.header('X-Total_Count', total['count(*)']);

        const solicitacoes = await connection('solicitacao')
            .join('solicitante', 'solicitante.id', '=', 'solicitacao.solicitante_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'solicitacao.*',
                'solicitante.nome',
                'solicitante.email',
                'solicitante.empresa',
                'solicitante.setor',
                'solicitante.dataCadastro'
            ]);

        return response.json(solicitacoes);
    },

    async create(request, response) {
        const { titulo, descricao, prioridade, dataCadastro, dataConclusao } = request.body;
        const solicitante_id = request.headers.authorization;

        const [id] = await connection('solicitacao').insert({
            titulo,
            descricao,
            prioridade,
            dataCadastro,
            dataConclusao,
            solicitante_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const solicitante_id = request.headers.authorization;

        const solicitacao = await connection('solicitacao')
            .where('id', id)
            .select('solicitante_id')
            .first();

        if (solicitacao.solicitante_id != solicitante_id) {
            return response.status(401).json({
                error: 'Operação não permitida.'
            });
        }

        await connection('solicitacao').where('id', id).delete();

        return response.status(204).send();
    }
};