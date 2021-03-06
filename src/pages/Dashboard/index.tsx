import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repo, setRepo] = React.useState<GithubRepository[]>(() => {
    const storageRepo = localStorage.getItem('@GitCollection:repositories');
    if (storageRepo) {
      return JSON.parse(storageRepo);
    }
    return [];
  });
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const formEL = React.useRef<HTMLFormElement | null>(null);

  React.useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repo));
  }, [repo]);

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

    try {
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);

      const repository = response.data;
      setRepo([...repo, repository]);
      formEL.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch (error) {
      setInputError('repositorio não encontrado');
    }
  }
  return (
    <>
      <img src={logo} alt="git colection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form
        ref={formEL}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repo.map((repository, index) => (
          <Link
            to={`/repositorios/${repository.full_name}`}
            key={repository.full_name + index}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronsRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
};

export default Dashboard;
