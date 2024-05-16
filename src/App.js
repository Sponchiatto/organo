import { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import Formulario from "./components/Formulario";
import Time from "./components/Time";
import Rodape from "./components/Rodape/Rodape";
import Adicionar from "./components/EsconderMostrarForm";
import { v4 as uuidv4 } from "uuid";
import useLocalState from "@phntms/use-local-state";
import db from "./db.json";

function App() {
  const timesDB = db.timesDB;
  const colaboradoresDB = db.colaboradoresDB;

  const [times, setTimes] = useLocalState("times", timesDB);
  const [colaboradores, setColaboradores] = useLocalState(
    "colaboradores",
    colaboradoresDB
  );
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const timesLocalStorage = localStorage.getItem("times");
    const colaboradoresLocalStorage = localStorage.getItem("colaboradores");

    if (timesLocalStorage) {
      try {
        setTimes(JSON.parse(timesLocalStorage));
      } catch (e) {
        console.log("Failed to parse times from localStorage", e);
        setTimes(timesDB);
      }
    } else {
      setTimes(timesDB);
    }

    if (colaboradoresLocalStorage) {
      try {
        setColaboradores(JSON.parse(colaboradoresLocalStorage));
      } catch (e) {
        console.error("Failed to parse colaboradores from localStorage", e);
        setColaboradores(colaboradoresDB);
      }
    } else {
      setColaboradores(colaboradoresDB);
    }
  }, [setTimes, setColaboradores, timesDB, colaboradoresDB]);

  useEffect(() => {
    localStorage.setItem("times", JSON.stringify(times));
  }, [times]);

  useEffect(() => {
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));
  }, [colaboradores]);

  function deletarColaborador(id) {
    setColaboradores(
      colaboradores.filter((colaborador) => colaborador.id !== id)
    );
  }

  function mudarCor(cor, id) {
    setTimes(
      times.map((time) => {
        if (time.id === id) {
          time.cor = cor;
        }
        return time;
      })
    );
  }

  function aoCriarTime(novoTime) {
    setTimes([...times, { ...novoTime, id: uuidv4() }]);
  }

  function resolverFavorito(id) {
    setColaboradores(
      colaboradores.map((colaborador) => {
        if (colaborador.id === id) colaborador.favorito = !colaborador.favorito;
        return colaborador;
      })
    );
  }
  return (
    <div className="App">
      <Banner />

      {mostrarFormulario && (
        <Formulario
          cadastrarTime={aoCriarTime}
          times={times.map((time) => time.nome)}
          aoCadastrar={(colaborador) =>
            setColaboradores([...colaboradores, colaborador])
          }
        />
      )}

      <Adicionar
        toggleFormulario={() => setMostrarFormulario(!mostrarFormulario)}
      />

      {times.map((time, indice) => {
        return (
          <Time
            mudarCor={mudarCor}
            key={indice}
            time={time}
            colaboradores={colaboradores.filter(
              (colaborador) => colaborador.time === time.nome
            )}
            aoDeletar={deletarColaborador}
            aoFavoritar={resolverFavorito}
          />
        );
      })}
      <Rodape />
    </div>
  );
}

export default App;
