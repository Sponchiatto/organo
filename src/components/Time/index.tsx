import React from "react";
import Colaborador from "../Colaborador";
import "./Time.css";
import hexToRgba from "hex-to-rgba";
import { IColaboradorType } from "../../compartilhado/interfaces/IColaborador"; 


interface TimeProps {
  time: {
    id: number;
    nome: string;
    cor: string;
  };
  colaboradores: IColaboradorType[];
  aoDeletar: (id: number) => void;
  mudarCor: (cor: string, id: number) => void;
  aoFavoritar: (id: number) => void;
}

const Time: React.FC<TimeProps> = ({
  time,
  colaboradores,
  aoDeletar,
  mudarCor,
  aoFavoritar,
}) => {
  return (
    colaboradores.length > 0 && (
      <section
        className="time"
        style={{
          backgroundImage: "url(/imagens/fundo.png)",
          backgroundColor: hexToRgba(time.cor, "0.6"),
        }}
      >
        <input
          type="color"
          className="input-cor"
          value={time.cor}
          onChange={(evento: React.ChangeEvent<HTMLInputElement>) => {
            mudarCor(evento.target.value, time.id);
          }}
        />
        <h3 style={{ borderColor: time.cor }}>{time.nome}</h3>
        <div className="colaboradores">
          {colaboradores.map((colaborador, indice) => (
            <Colaborador
              key={indice}
              colaborador={colaborador}
              corDeFundo={time.cor}
              aoDeletar={aoDeletar}
              aoFavoritar={aoFavoritar}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default Time;
