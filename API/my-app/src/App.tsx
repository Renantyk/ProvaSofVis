import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListaTarefas from './components/ListaTarefas';
import CadastroTarefas from './components/CadastroTarefas';
import './App.css';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <div className="App">
              <nav>
                  <ul>
                      <li>
                          <Link to="/produtos">Lista de Tarefas</Link>
                      </li>
                      <li>
                          <Link to="/cadastro">Cadastro de Tarefas</Link>
                      </li>
                  </ul>
              </nav>
              <Routes>
                  <Route path="/" element={<ListaTarefas />} />
                  <Route path="/cadastro" element={<CadastroTarefas />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
};