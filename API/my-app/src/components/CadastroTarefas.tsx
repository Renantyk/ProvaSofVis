import React, {useEffect, useState} from "react";
import { Tarefa } from "../interfaces/Tarefa";

function CadastroTarefas(){
    const [nome, setNome] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [categoria, setCategoria] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    function handleSubmit (e: any) {
        e.preventDefault();
    }

    const novaTarefa = {
        nome,
        titulo,
        descricao,
        categoria,
        status
    };

    fetch('<http://localhost:5020/cadastro>', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaTarefa)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        setNome('');
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setStatus('');
    })
    .catch(error => {
        console.error('Erro:', error);
    });

    return (
        <div>
            <h2>Cadastrar Nova Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </label>
                <label>
                    Titulo:
                    <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
                </label>
                <label>
                    Descricao:
                    <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)}required />
                </label>
                <label>
                    Categoria:
                    <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} required />
                </label>
                <label>
                    Status:
                    <input type="text" value={status} onChange={e => setStatus(e.target.value)} required />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};


export default CadastroTarefas;

