import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]); // salva os repositórios no estado       
    
  useEffect(() => { //  carrega a lista de repositórios
      api.get('repositories').then(response =>{ 
          setRepositories(response.data); 
      });
  }, []);



  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Front-end com ReactJS",
      url: "http://algumacoisa.com",
      techs: ['Node', 'React', 'React Native']
    })
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // não precisa de response pq a delete não retorna nada
    await api.delete(`repositories/${id}`); // passo o id como variável
    

    const newRepositories = repositories.filter( // faz um filtro em todos os repositórios
      repository => repository.id !== id // para cada um dos repositórios, retorna em um novo repositório apenas aqueles valores que tem o id diferente do filtrado
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
