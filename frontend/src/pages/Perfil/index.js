import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Perfil() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const history = useHistory();

    const idSolicitante = localStorage.getItem('idSolicitante');
    const nomeSolicitante = localStorage.getItem('nomeSolicitante');

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: idSolicitante,
            }
        }).then(Response => {
            setSolicitacoes(Response.data);
        })
    }, [idSolicitante]);

    async function handleDeletarSolcitacao(id) {
        try {
            await api.delete(`solicitacao/${id}`, {
                headers: {
                    Authorization: idSolicitante,
                }
            });

            setSolicitacoes(solicitacoes.filter(solicitacao => solicitacao.id !== id));
        }
        catch (err) {
            alert('Erro ao deletar solicitação, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="perfil-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {nomeSolicitante}</span>

                <Link className="button" to="solicitacao/nova">Cadastrar solicitação</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Solicitações Cadastradas</h1>
            <ul>
                {solicitacoes.map(solicitacao => (
                    <li key={solicitacao}>
                        <strong>SOLICITAÇÃO:</strong>
                        <p>{solicitacao.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{solicitacao.descricao}</p>

                        <strong>PRIORIDADE:</strong>
                        <p>{solicitacao.prioridade}</p>

                        {/* Formatar em reais (R$ 100)
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(100)}</p> */}

                        <button onClick={() => handleDeletarSolcitacao(solicitacao.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}