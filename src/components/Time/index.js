import "./Time.css";

const Time = (props) => {
  const cssCorSecundaria = { backgroundColor: props.corSecundaria };

  return (
    <section className="time" style={cssCorSecundaria}>
      <h3 style={{ borderColor: props.corPrimaria }}> {props.nome} </h3>
    </section>
  );
};

export default Time;
