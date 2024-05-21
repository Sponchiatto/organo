import { useEffect, useState } from "react";
import Botao from "../Botao";
import Campo from "../Campo";
import ListaSuspensa from "../ListaSuspensa";
import "./formulario.css";
import useLocalState from "@phntms/use-local-state";

const Formulario = ({ aoCadastrar, times, cadastrarTime, aoDeletarTime }) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [imagem, setImagem] = useState("");
  const [time, setTime] = useState("");
  const [nomeTime, setNomeTime] = useState("");
  const [corTime, setCorTime] = useState("");
   const [timeParaDeletar, setTimeParaDeletar] = useState("");

  const aoSubmeter = (evento) => {
    evento.preventDefault();
    aoCadastrar({
      nome,
      cargo,
      imagem,
      time,
    });
    setNome("");
    setCargo("");
    setImagem("");
    setTime("");
  };

  const aoSubmeterNovoTime = (evento) => {
    evento.preventDefault();
    cadastrarTime({ nome: nomeTime, cor: corTime });
    setNomeTime("");
    setCorTime("");
  };

  const aoSubmeterDeletarTime = (evento) => {
    evento.preventDefault();
    if (timeParaDeletar) {
      aoDeletarTime(timeParaDeletar);
      setTimeParaDeletar("");
    }
  };

  return (
    <section className="formulario-container">
      <form className="formulario" onSubmit={aoSubmeter}>
        <h2>Preencha os dados para criar o card do colaborador.</h2>
        <Campo
          obrigatorio={true}
          label="Nome"
          placeholder="Digite seu nome "
          valor={nome}
          aoAlterado={(valor) => setNome(valor)}
        />
        <Campo
          obrigatorio={true}
          label="Cargo"
          placeholder="Digite seu cargo "
          valor={cargo}
          aoAlterado={(valor) => setCargo(valor)}
        />
        <Campo
          label="Imagem"
          placeholder="Informe o endereço da imagem "
          valor={imagem}
          aoAlterado={(valor) => setImagem(valor)}
        />
        <ListaSuspensa
          obrigatorio={true}
          label="Times"
          items={times}
          valor={time}
          aoAlterado={(valor) => setTime(valor)}
        />
        <Botao texto="Criar card" />
      </form>
      <div className="formularion-div">
        <form className="formulario" onSubmit={aoSubmeterNovoTime}>
          <h2>Preencha os dados para criar um novo time.</h2>
          <Campo
            obrigatorio={true}
            label="Nome"
            placeholder="Digite o nome do time"
            valor={nomeTime}
            aoAlterado={(valor) => setNomeTime(valor)}
          />
          <Campo
            obrigatorio={true}
            label="Cor"
            type="color"
            placeholder="Digite sua cor"
            valor={corTime}
            aoAlterado={(valor) => setCorTime(valor)}
          />
          <Botao texto="Criar Time" />
        </form>

        <form
          className="formulario formulario-deletar"
          onSubmit={aoSubmeterDeletarTime}
        >
          <h2>Deletar Time.</h2>
          <ListaSuspensa
            obrigatorio={true}
            label="Times"
            items={times}
            valor={timeParaDeletar}
            aoAlterado={(valor) => setTimeParaDeletar(valor)}
          />
          <Botao texto="Deletar Time" />
        </form>
      </div>
    </section>
  );
};

export default Formulario;
