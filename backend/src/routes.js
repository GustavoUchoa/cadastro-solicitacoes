const express = require('express');

const SolicitanteController = require('./controllers/SolicitanteController');
const SolicitacaoController = require('./controllers/SolicitacaoController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/solicitantes', SolicitanteController.index);
routes.post('/solicitante', SolicitanteController.create);

routes.get('/solicitacoes', SolicitacaoController.index);
routes.post('/solicitacao', SolicitacaoController.create);
routes.delete('/solicitacao/:id', SolicitacaoController.delete);

routes.get('/perfil', PerfilController.index);
routes.post('/session', SessionController.create);

module.exports = routes;