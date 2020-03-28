
exports.up = function (knex) {
    return knex.schema.createTable('solicitacao', function (table) {
        table.increments('id');
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.boolean('prioridade').notNullable();
        table.datetime('dataCadastro').notNullable();
        table.datetime('dataConclusao');

        table.string('solicitante_id').notNullable();
        table.foreign('solicitante_id').references('id').inTable('solicitante');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('solicitacao');
};