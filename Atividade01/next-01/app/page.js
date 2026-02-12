import Image from "next/image";

export default function Home() {
  return (
    <div class = "txth1">
      <h1> Fazendo o meu botão </h1>
      <MyButton />
    </div>
    );
  function MyButton(){
    return (
    <button> Um botão </button>
      )
    }
  }
  