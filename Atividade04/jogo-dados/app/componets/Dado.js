export default function Dado({ valor }) {
  return (
    <img
      src={`/dados/dado${valor}.png`}
      alt={`Dado ${valor}`}
      style={{ width: 80 }}
    />
  );
}
import { useState } from "react";
import Dado from "./Dado";

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);
  const [jogadorAtual, setJogadorAtual] = useState(1);

  const [dadosJ1, setDadosJ1] = useState([1, 1]);
  const [dadosJ2, setDadosJ2] = useState([1, 1]);

  const [resultado, setResultado] = useState("");
  const [placar, setPlacar] = useState({ j1: 0, j2: 0 });

  const rolarDados = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    if (jogadorAtual === 1) {
      setDadosJ1([d1, d2]);
      setJogadorAtual(2);
    } else {
      setDadosJ2([d1, d2]);
      calcularResultado([d1, d2]);
      setJogadorAtual(1);
      setRodada((r) => r + 1);
    }
  };

  const calcularResultado = (dadosJ2Atual) => {
    const soma1 = dadosJ1[0] + dadosJ1[1];
    const soma2 = dadosJ2Atual[0] + dadosJ2Atual[1];

    if (soma1 > soma2) {
      setResultado("Jogador 1 ganhou a rodada!");
      setPlacar((p) => ({ ...p, j1: p.j1 + 1 }));
    } else if (soma2 > soma1) {
      setResultado("Jogador 2 ganhou a rodada!");
      setPlacar((p) => ({ ...p, j2: p.j2 + 1 }));
    } else {
      setResultado("Rodada empatada!");
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setPlacar({ j1: 0, j2: 0 });
    setResultado("");
    setJogadorAtual(1);
  };

  const jogoFinalizado = rodada > 5;

  const vencedorFinal = () => {
    if (placar.j1 > placar.j2) return "Jogador 1 venceu!";
    if (placar.j2 > placar.j1) return "Jogador 2 venceu!";
    return "Empate geral!";
  };

  return (
    <div>
      <h2>Rodada: {rodada <= 5 ? rodada : 5}</h2>

      <h3>Jogador 1</h3>
      <Dado valor={dadosJ1[0]} />
      <Dado valor={dadosJ1[1]} />

      <h3>Jogador 2</h3>
      <Dado valor={dadosJ2[0]} />
      <Dado valor={dadosJ2[1]} />

      <p>{resultado}</p>

      {!jogoFinalizado ? (
        <button onClick={rolarDados}>
          Jogar (Jogador {jogadorAtual})
        </button>
      ) : (
        <>
          <h2>{vencedorFinal()}</h2>
          <button onClick={reiniciar}>Jogar Novamente</button>
        </>
      )}
    </div>
  );
} 