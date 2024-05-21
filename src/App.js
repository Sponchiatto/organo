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
} from "./reducers/timesReducer";

const initialColaboradores = () => {
  const storedColaboradores = localStorage.getItem("colaboradores");
  return storedColaboradores ? JSON.parse(storedColaboradores) : [];
};

const initialTimes = () => {
  const storedTimes = localStorage.getItem("times");
  return storedTimes ? JSON.parse(storedTimes) : [];
};

function App() {
  const [colaboradores, dispatchColaboradores] = useReducer(
    colaboradoresReducer,
    [],
    initialColaboradores
  );
  const [times, dispatchTimes] = useReducer(timesReducer, [], initialTimes);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Initialize state from localStorage
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

  // Update localStorage whenever times or colaboradores change
  useEffect(() => {
    localStorage.setItem("times", JSON.stringify(times));
  }, [times]);

  useEffect(() => {
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  }, [colaboradores]);

  // Handler functions
  const cadastrarColaborador = (colaborador) => {
    dispatchColaboradores({ type: ADD_COLABORADOR, payload: colaborador });
  };

  const deletarColaborador = (id) => {
    dispatchColaboradores({ type: DELETE_COLABORADOR, payload: id });
  };

  const resolverFavorito = (id) => {
    dispatchColaboradores({ type: TOGGLE_FAVORITO, payload: id });
  };

  const mudarCor = (cor, id) => {
    dispatchTimes({ type: UPDATE_COR, payload: { cor, id } });
  };

  const aoCriarTime = (novoTime) => {
    dispatchTimes({ type: ADD_TIME, payload: novoTime });
  };

  return (
    <div className="App">
      <Banner />
      {mostrarFormulario && (
        <Formulario
          cadastrarTime={aoCriarTime}
          times={times.map((time) => time.nome)}
          aoCadastrar={cadastrarColaborador}
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
      <Rodape />
    </div>
  );
}

export default App;
