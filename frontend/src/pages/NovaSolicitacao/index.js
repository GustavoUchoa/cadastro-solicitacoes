import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function NovaSolicitacao() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('');
    let [dataCadastro, setDataCadastro] = useState('');

    const history = useHistory();

    const idSolicitante = localStorage.getItem('idSolicitante');

    async function handleNovaSolicitacao(e) {
        e.preventDefault();

        const data = ({
            titulo,
            descricao,
            prioridade,
            dataCadastro
        });

        console.log(titulo,
            descricao,
            prioridade,
            dataCadastro);

        try {
            await api.post('solicitacao', data, {
                headers: {
                    Authorization: idSolicitante,
                }
            });

            history.push('/perfil');
        }
        catch (err) {
            alert('Erro ao cadastrar solicitação, tente novamente.');
        }
    }

    return (
        <div className="nova-solicitacao-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro de solicitação</h1>
                    <p>Descreva sua solicitação o mais específico possível para o melhor entendimento.</p>

                    <Link className="back-link" to="/perfil">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleNovaSolicitacao}>
                    <input
                        placeholder="Título"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input
                        placeholder="Prioridade"
                        value={prioridade}
                        onChange={e => setPrioridade(e.target.value)}
                    />

                    <div
                        value={dataCadastro = new Date().toLocaleString()}
                        onChange={e => setDataCadastro(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}