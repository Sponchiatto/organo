import "./campo.css";

const Campo = ({
  type = "text",
  label,
  placeholder,
  valor,
  aoAlterado,
  obrigatorio = false,
}) => {

  return (
    <div className={`campo campo-${type}`}>
      <label>{label}</label>
      <input
        type={type}
        required={obrigatorio}
        placeholder={placeholder}
        value={valor}
        onChange={(evento) => aoAlterado(evento.target.value)}
      />
    </div>
  );
};

export default Campo;
