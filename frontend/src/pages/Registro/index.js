import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.svg'

export default function Registro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [setor, setSetor] = useState('');
    let [dataCadastro, setDataCadastro] = useState('');

    const history = useHistory();

    async function handleRegistro(e) {
        e.preventDefault();

        const data = ({
            nome,
            email,
            empresa,
            setor,
            dataCadastro
        });

        try {
            const response = await api.post('solicitante', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }
        catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="registro-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro de solicitante</h1>
                    <p>Faça seu cadastro, entre na aplicação e solicite uma demanda.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegistro}>
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Empresa"
                        value={empresa}
                        onChange={e => setEmpresa(e.target.value)}
                    />

                    <input
                        placeholder="Setor"
                        value={setor}
                        onChange={e => setSetor(e.target.value)}
                    />

                    <div
                        value= {dataCadastro = new Date().toLocaleString()}
                        onChange={e => setDataCadastro(e.target.value)}
                    />

                    {/* <div className="input-group">
                        <input placeholder="Cidade" />
                        <input placeholder="UF" style={{ width: 80 }} />
                    </div> */}

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}