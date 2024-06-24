import React from "react";
import "./colaboradores.css";
import { AiFillCloseCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IColaboradorType } from "../../compartilhado/interfaces/IColaborador";


interface ColaboradorProps {
  colaborador: IColaboradorType;
  corDeFundo: string;
  aoDeletar: (id: number) => void;
  aoFavoritar: (id: number) => void;
}

const Colaborador: React.FC<ColaboradorProps> = ({
  colaborador,
  corDeFundo,
  aoDeletar,
  aoFavoritar,
}) => {
  function favoritar() {
    aoFavoritar(colaborador.id);
  }

  return (
    <div className="colaborador">
      <AiFillCloseCircle
        size={25}
        className="deletar"
        onClick={() => aoDeletar(colaborador.id)}
      />
      <div className="cabecalho" style={{ backgroundColor: corDeFundo }}>
        <img src={colaborador.imagem} alt={colaborador.nome} />
      </div>
      <div className="rodape">
        <h4>{colaborador.nome}</h4>
        <h5>{colaborador.cargo}</h5>
        <div className="favorito">
          {colaborador.favorito ? (
            <AiFillHeart color="#ff0000" size={25} onClick={favoritar} />
          ) : (
            <AiOutlineHeart size={25} onClick={favoritar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Colaborador;
