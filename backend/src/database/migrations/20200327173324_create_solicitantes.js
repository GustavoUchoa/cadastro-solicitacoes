exports.up = function (knex) {
  return knex.schema.createTable('solicitante', function (table) {
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('Empresa').notNullable();
    table.string('setor').notNullable();
    table.datetime('dataCadastro').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('solicitante');
};
