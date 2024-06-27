import React from "react";
import "./adicionar.css";
import { BiAddToQueue } from "react-icons/bi";

interface EsconderMostrarFormProps {
  toggleFormulario: () => void;
}

const EsconderMostrarForm: React.FC<EsconderMostrarFormProps> = ({
  toggleFormulario,
}) => {
  return (
    <div className="container">
      <h1 className="titulo fonte-prata-regular">Minha Organização</h1>
      <button className="botao-mostrar" onClick={toggleFormulario}>
        <BiAddToQueue className="icon" size={32} />
        <span className="tooltip">Cadastrar novo membro ou time</span>
      </button>
    </div>
  );
};

export default EsconderMostrarForm;
