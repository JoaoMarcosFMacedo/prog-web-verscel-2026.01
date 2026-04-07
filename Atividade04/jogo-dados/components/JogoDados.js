"use client";
import { useState, useEffect } from "react";
import Dado from "./Dado";

export default function JogoDeDados() {
  const [jogadorA, setJogadorA] = useState([null, null]);
  const [jogadorB, setJogadorB] = useState([null, null]);
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [placarA, setPlacarA] = useState(0);
  const [placarB, setPlacarB] = useState(0);
  const [resultado, setResultado] = useState("");
  const [fimDeJogo, setFimDeJogo] = useState(false);

  function jogar(jogador) {
    if (fimDeJogo) return;

    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;

    if (jogador === "A") {
      setJogadorA([dado1, dado2]);
    } else {
      setJogadorB([dado1, dado2]);
    }
  }

  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `/dado${i}.png`;
    }
  }, []);

  function verificarRodada() {
    if (jogadorA[0] && jogadorB[0] && !resultado) {
      const somaA = jogadorA[0] + jogadorA[1];
      const somaB = jogadorB[0] + jogadorB[1];

      if (somaA > somaB) {
        setResultado("Jogador A venceu a rodada!");
        setPlacarA((p) => p + 1);
      } else if (somaB > somaA) {
        setResultado("Jogador B venceu a rodada!");
        setPlacarB((p) => p + 1);
      } else {
        setResultado("Empate!");
      }
    }
  }

  function proximaRodada() {
    if (rodadaAtual === 5) {
      setFimDeJogo(true);
    } else {
      setRodadaAtual((r) => r + 1);
      setJogadorA([null, null]);
      setJogadorB([null, null]);
      setResultado("");
    }
  }

  function reiniciar() {
    setJogadorA([null, null]);
    setJogadorB([null, null]);
    setRodadaAtual(1);
    setPlacarA(0);
    setPlacarB(0);
    setResultado("");
    setFimDeJogo(false);
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Rodada {rodadaAtual}
      </h1>

      <div className="bg-white border rounded-2xl p-8 flex gap-12 shadow-lg max-w-2xl mx-auto">
        <div className="flex flex-col items-center flex-1">
          <p className="text-lg font-bold text-gray-800 mb-3">Jogador A</p>
          <div className="flex gap-2 mb-4">
            <Dado valor={jogadorA[0]} />
            <Dado valor={jogadorA[1]} />
          </div>
          <button
            onClick={() => jogar("A")}
            disabled={jogadorA[0] || fimDeJogo}
            className={`px-4 py-2 rounded-full transition whitespace-nowrap ${
              jogadorA[0] || fimDeJogo
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Jogar Dado A
          </button>
        </div>

        <div className="w-px bg-gray-200"></div>

        <div className="flex flex-col items-center flex-1">
          <p className="text-lg font-bold text-gray-800 mb-3">Jogador B</p>
          <div className="flex gap-2 mb-4">
            <Dado valor={jogadorB[0]} />
            <Dado valor={jogadorB[1]} />
          </div>
          <button
            onClick={() => jogar("B")}
            disabled={jogadorB[0] || fimDeJogo}
            className={`px-4 py-2 rounded-full transition whitespace-nowrap ${
              jogadorB[0] || fimDeJogo
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Jogar Dado B
          </button>
        </div>
      </div>

      {resultado && (
        <p className="mt-4 text-gray-700 font-medium">{resultado}</p>
      )}

      {!fimDeJogo && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={verificarRodada}
            disabled={!jogadorA[0] || !jogadorB[0] || resultado}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
          >
            Verificar Resultado
          </button>
          <button
            onClick={proximaRodada}
            disabled={!resultado}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            Próxima Rodada
          </button>
        </div>
      )}

      <p className="mt-4 text-gray-700 font-medium">
        Placar: {placarA} x {placarB}
      </p>

      {fimDeJogo && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">
            {placarA > placarB
              ? "Jogador A venceu o jogo!"
              : placarB > placarA
                ? "Jogador B venceu o jogo!"
                : "Empate geral!"}
          </h2>
          <button
            onClick={reiniciar}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
