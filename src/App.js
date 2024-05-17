import { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import Formulario from "./components/Formulario";
import Time from "./components/Time";
import Rodape from "./components/Rodape/Rodape";
import Adicionar from "./components/EsconderMostrarForm";
import { v4 as uuidv4 } from "uuid";
import useLocalState from "@phntms/use-local-state";

function App() {
  // States
  const [times, setTimes] = useLocalState("times", []);
  const [colaboradores, setColaboradores] = useLocalState("colaboradores", []);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Initialize state from localStorage
  useEffect(() => {
    const storedTimes = localStorage.getItem("times");
    const storedColaboradores = localStorage.getItem("colaboradores");

    if (storedTimes) {
      try {
        setTimes(JSON.parse(storedTimes));
      } catch (e) {
        console.error("Failed to parse times from localStorage", e);
      }
    }

    if (storedColaboradores) {
      try {
        setColaboradores(JSON.parse(storedColaboradores));
      } catch (e) {
        console.error("Failed to parse colaboradores from localStorage", e);
      }
    }
  }, [setTimes, setColaboradores]);

  // Update localStorage whenever times or colaboradores change
  useEffect(() => {
    localStorage.setItem("times", JSON.stringify(times));
  }, [times]);

  useEffect(() => {
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  }, [colaboradores]);

  // Handler functions
  const cadastrarColaborador = (colaborador) => {
    setColaboradores((prevColaboradores) => [
      ...prevColaboradores,
      { ...colaborador, id: uuidv4() },
    ]);
  };

  const deletarColaborador = (id) => {
    setColaboradores((prevColaboradores) =>
      prevColaboradores.filter((colaborador) => colaborador.id !== id)
    );
  };

  const mudarCor = (cor, id) => {
    setTimes((prevTimes) =>
      prevTimes.map((time) => (time.id === id ? { ...time, cor } : time))
    );
  };

  const aoCriarTime = (novoTime) => {
    setTimes((prevTimes) => [...prevTimes, { ...novoTime, id: uuidv4() }]);
  };

  const resolverFavorito = (id) => {
    setColaboradores((prevColaboradores) =>
      prevColaboradores.map((colaborador) =>
        colaborador.id === id
          ? { ...colaborador, favorito: !colaborador.favorito }
          : colaborador
      )
    );
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
