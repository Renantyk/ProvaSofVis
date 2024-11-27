import React, {useEffect, useState} from "react";
import { Tarefa } from "../interfaces/Tarefa";

const ListaTarefas: React.FC = () => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
        fetch('<http://localhost:5020/produtos>') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setTarefas(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>titulo</th>
                        <th>descricao</th>
                        <th>categoria</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tarefas => (
                        <tr key={tarefas.id}>
                            <td>{tarefas.id}</td>
                            <td>{tarefas.nome}</td>
                            <td>{tarefas.titulo}</td>
                            <td>{tarefas.descricao}</td>
                            <td>{tarefas.categoria}</td>
                            <td>{tarefas.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaTarefas;