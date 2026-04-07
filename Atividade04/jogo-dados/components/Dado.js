export default function Dado({ valor }) {
  if (!valor) return <div className="w-14 h-14" />;

  return (
    <img
      src={`/dado${valor}.png`}
      alt="dado"
      className="w-14 h-14"
    />
  );
}