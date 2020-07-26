import React ,{useEffect } from "react";
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



  async function handleRemoveRepository( id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repositorie) => repositorie.id !== id));
  }
  console.log()

  return (
    <div>
      <ul className="apis">
        {repositories.map((repositorie) => (
          <div key="repositorie.id" className="text">
            <li >
              <h1>Titulo:{repositorie.title}</h1>
            </li>
            <li  >
              <h2>Url:{repositorie.url}</h2>
            </li>
            <li >
              <h2>Tecnologias:{repositorie.techs}</h2>
            </li>
            <li key="repositorie.like">
              <h2>Like:{repositorie.like}</h2>
            </li>
            <div className="grid">
              <button onClick={() => handleAddRepository(1)}>Adicionar</button>
              <ul data-testid="repository-list">
                
              <li key={repositorie.id}>
          <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
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
