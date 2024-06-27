import React, { ReactElement, useEffect, useState } from "react";
import Botao from "../Botao";
import Campo from "../Campo";
import ListaSuspensa from "../ListaSuspensa";
import "./formularios.css";

interface Colaborador {
  nome: string;
  cargo: string;
  imagem: string;
  time: string;
}

interface FormularioProps {
  aoCadastrar: (colaborador: Colaborador) => void;
  times: string[];
  cadastrarTime: (time: { nome: string; cor: string }) => void;
  aoDeletarTime: (time: string) => void;
}

const Formulario: React.FC<FormularioProps> = ({
  aoCadastrar,
  times,
  cadastrarTime,
  aoDeletarTime,
}) => {
  const [nome, setNome] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [imagem, setImagem] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [nomeTime, setNomeTime] = useState<string>("");
  const [corTime, setCorTime] = useState<string>("");
  const [timeParaDeletar, setTimeParaDeletar] = useState<string>("");

  const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
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

  const aoSubmeterNovoTime = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    cadastrarTime({ nome: nomeTime, cor: corTime });
    setNomeTime("");
    setCorTime("");
  };

  const aoSubmeterDeletarTime = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (timeParaDeletar) {
      aoDeletarTime(timeParaDeletar);
      setTimeParaDeletar("");
    }
  };

  return (
    <section className="formulario-container">
      <form className="formulario" onSubmit={(evento) => aoSubmeter(evento)}>
        <h2>Preencha os dados para criar o card do colaborador.</h2>
        <Campo
          obrigatorio={true}
          label="Nome"
          placeholder="Digite seu nome "
          valor={nome}
          aoAlterado={(valor: string) => setNome(valor)}
        />
        <Campo
          obrigatorio={true}
          label="Cargo"
          placeholder="Digite seu cargo "
          valor={cargo}
          aoAlterado={(valor: string) => setCargo(valor)}
        />
        <Campo
          label="Imagem"
          placeholder="Informe o endereço da imagem "
          valor={imagem}
          aoAlterado={(valor: string) => setImagem(valor)}
        />
        <ListaSuspensa
          obrigatorio={true}
          label="Times"
          items={times}
          valor={time}
          aoAlterado={(valor: string) => setTime(valor)}
        />
        <Botao>Criar Card</Botao>
      </form>
      <div className="formularion-div">
        <form
          className="formulario"
          onSubmit={(evento) => aoSubmeterNovoTime(evento)}
        >
          <h2>Preencha os dados para criar um novo time.</h2>
          <Campo
            obrigatorio={true}
            label="Nome"
            placeholder="Digite o nome do time"
            valor={nomeTime}
            aoAlterado={(valor: string) => setNomeTime(valor)}
          />
          <Campo
            obrigatorio={true}
            label="Cor"
            type="color"
            placeholder="Digite sua cor"
            valor={corTime}
            aoAlterado={(valor: string) => setCorTime(valor)}
          />
          <Botao>Criar Time</Botao>
        </form>

        <form
          className="formulario formulario-deletar"
          onSubmit={(evento) => aoSubmeterDeletarTime(evento)}
        >
          <h2>Deletar Time.</h2>
          <ListaSuspensa
            obrigatorio={true}
            label="Times"
            items={times}
            valor={timeParaDeletar}
            aoAlterado={(valor: string) => setTimeParaDeletar(valor)}
          />
          <Botao>Deletar Time</Botao>
        </form>
      </div>
    </section>
  );
};

export default Formulario;
