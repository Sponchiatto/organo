import "./botao.css";
import React, { ReactElement } from "react";

interface BotaoProps {
  children: ReactElement;
}

const Botao = (props: BotaoProps) => {
  return <button className="botao">{props.children}</button>;
};

export default Botao;
