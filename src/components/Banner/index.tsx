import "./Banner.css";
import React from "react";

interface BannerProps {
  enderecoImagem: string;
  textoAlternativo?: string;
}

function Banner({ enderecoImagem, textoAlternativo }: BannerProps) {
  return (
    <header className="banner">
      {/* <img src="/imagens/banner.png" alt="O Banner da página Organa"></img> */}
      <img src={enderecoImagem} alt={textoAlternativo}></img>
    </header>
  );
}

export default Banner;
