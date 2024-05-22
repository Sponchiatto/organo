import "./App.css"; 
import { useEffect, useReducer, useState } from "react";
import Banner from "./components/Banner/Banner"; 
import Formulario from "./components/Formulario"; 
import Time from "./components/Time"; 
import Rodape from "./components/Rodape/Rodape";
import Adicionar from "./components/EsconderMostrarForm";
import colaboradoresReducer, {
  ADD_COLABORADOR,
  DELETE_COLABORADOR,
  TOGGLE_FAVORITO,
} from "./reducers/colaboradoresReducer"; 
import timesReducer, {
  ADD_TIME,
  UPDATE_COR,
  DELETE_TIME,
} from "./reducers/timesReducer"; 

// Função para inicializar o estado de colaboradores a partir do localStorage
const initialColaboradores = () => {
  const storedColaboradores = localStorage.getItem("colaboradores");
  return storedColaboradores ? JSON.parse(storedColaboradores) : [];
};

// Função para inicializar o estado de times a partir do localStorage
const initialTimes = () => {
  const storedTimes = localStorage.getItem("times");
  return storedTimes ? JSON.parse(storedTimes) : [];
};

function App() {
  // useReducer para gerenciar o estado de colaboradores e times com estado inicial do localStorage
  const [colaboradores, dispatchColaboradores] = useReducer(
    colaboradoresReducer,
    [],
    initialColaboradores
  );
  const [times, dispatchTimes] = useReducer(timesReducer, [], initialTimes);
  
  // Estado para controlar a visibilidade do formulário
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // useEffect para inicializar o estado a partir do localStorage na montagem do componente
  useEffect(() => {
    const storedTimes = localStorage.getItem("times");
    const storedColaboradores = localStorage.getItem("colaboradores");

    if (storedTimes) {
      try {
        dispatchTimes({
          type: "INITIALIZE_TIMES",
          payload: JSON.parse(storedTimes),
        });
      } catch (e) {
        console.error("Failed to parse times from localStorage", e);
      }
    }

    if (storedColaboradores) {
      try {
        dispatchColaboradores({
          type: "INITIALIZE_COLABORADORES",
          payload: JSON.parse(storedColaboradores),
        });
      } catch (e) {
        console.error("Failed to parse colaboradores from localStorage", e);
      }
    }
  }, []);

  // useEffect para atualizar o localStorage sempre que o estado de times mudar
  useEffect(() => {
    localStorage.setItem("times", JSON.stringify(times));
  }, [times]);

  // useEffect para atualizar o localStorage sempre que o estado de colaboradores mudar
  useEffect(() => {
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  }, [colaboradores]);

  // Função para cadastrar um novo colaborador
  const cadastrarColaborador = (colaborador) => {
    dispatchColaboradores({ type: ADD_COLABORADOR, payload: colaborador });
  };

  // Função para deletar um colaborador
  const deletarColaborador = (id) => {
    dispatchColaboradores({ type: DELETE_COLABORADOR, payload: id });
  };

  // Função para alternar o status de favorito de um colaborador
  const resolverFavorito = (id) => {
    dispatchColaboradores({ type: TOGGLE_FAVORITO, payload: id });
  };

  // Função para mudar a cor de um time
  const mudarCor = (cor, id) => {
    dispatchTimes({ type: UPDATE_COR, payload: { cor, id } });
  };

  // Função para criar um novo time
  const aoCriarTime = (novoTime) => {
    dispatchTimes({ type: ADD_TIME, payload: novoTime });
  };

  // Função para deletar um time
  const deletarTime = (nomeTime) => {
    const timeToDelete = times.find((time) => time.nome === nomeTime);
    if (timeToDelete) {
      dispatchTimes({ type: DELETE_TIME, payload: timeToDelete.id });
    }
  };

  return (
    <div className="App">
      <Banner /> {/* Componente de banner */}
      <p className="alert">
        Seus times e colaboradores ficaram salvos na memória do navegador se
        você limpar seu histórico, eles serão perdidos!
      </p>
      {mostrarFormulario && (
        <Formulario
          cadastrarTime={aoCriarTime}
          times={times.map((time) => time.nome)}
          aoCadastrar={cadastrarColaborador}
          aoDeletarTime={deletarTime}
        />
      )}
      <Adicionar
        toggleFormulario={() => setMostrarFormulario((prev) => !prev)}
      />
      {times.map((time) => (
        <Time
          mudarCor={mudarCor}
          key={time.id}
          time={time}
          colaboradores={colaboradores.filter(
            (colaborador) => colaborador.time === time.nome
          )}
          aoDeletar={deletarColaborador}
          aoFavoritar={resolverFavorito}
        />
      ))}
      <Rodape /> {/* Componente de rodapé */}
    </div>
  );
}

export default App;
