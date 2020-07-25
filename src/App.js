import React, { useEffect } from "react";
import api from './services/api'
import "./styles.css";
import { useState } from "react";


function App() {
  const [ repositories, setRepositories ] = useState([])
  useEffect(() => {
    api.get('repositories').then((res) => {
      setRepositories(res.data)
    });
  }, [])
  async function handleAddRepository() {
    
    const res = await api.post("repositories", {
      title: "Joaozinho dos like",
      url: "url javas",
      techs: "React,Java,Angular",
    });
    const repositorie = res.data
    setRepositories([...repositories, repositorie])
  }
  
   async function handleRemoveRepository(id) {
     await api.delete("/repositories/" + id);

   }
  return (
    <div>
      <ul className="apis">
        {repositories.map((repositorie) => (
          <div className="text">
            <li key="repositorie.id">
              <h1>Titulo:{repositorie.title}</h1>
            </li>
            <li key="repositorie.id">
              <h2>Url:{repositorie.url}</h2>
            </li>
            <li key="repositorie.id">
              <h2>Tecnologias:{repositorie.techs}</h2>
            </li>
            <li key="repositorie.like">
              <h2>Like:{repositorie.like}</h2>
            </li>
            <div className="grid">
              <button onClick={() => handleAddRepository(1)}>Adicionar</button>
              <ul data-testid="repository-list">
                <li>
                  <button
                    key="repositorie.id"
                    onClick={() => handleRemoveRepository(1)}
                  >
                    Remover
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
