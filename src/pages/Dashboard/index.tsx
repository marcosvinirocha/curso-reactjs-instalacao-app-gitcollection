/* eslint-disable react/jsx-key */
import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repo, setRepo] = React.useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    const repository = response.data;
    setRepo([...repo, repository]);
    setNewRepo('');
  }
  return (
    <>
      <img src={logo} alt="git colection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repo.map(repository => (
          <a href="/repositorios" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronsRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};
