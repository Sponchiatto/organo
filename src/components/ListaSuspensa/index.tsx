import "./lista-suspensa.css";

interface ListaSuspensaProps {
  aoAlterado: (valor: string) => void;
  label: string;
  obrigatorio?: boolean;
  valor: string;
  items: string[];
}

const ListaSuspensa: React.FC<ListaSuspensaProps> = ({
  label,
  items,
  valor,
  aoAlterado,
  obrigatorio = false,
}) => {
  return (
    <div className="lista-suspensa">
      <label>{label}</label>
      <select
        required={obrigatorio}
        value={valor}
        onChange={(evento) => aoAlterado(evento.target.value)}
      >
        <option />
        {items.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default ListaSuspensa;
