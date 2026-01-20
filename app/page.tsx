import Megoldás from "@/app/Megoldás";

export default function HomePage() {
  const m: Megoldás = new Megoldás("utasadat.txt");
  return (
    <div>
      <div>Felszállók száma: {m.felszállókSzáma}</div>
      <div>Érvénytelen felszállók száma: {m.érvénytelenFelszállás}</div>
      <div>Max utas: {m.maxKeresésArray.maxFelszálló}</div>
      <div>Max utas első megálló: {m.maxKeresésArray.maxMegálló}</div>
      <div>Ingyenesen utazók száma: {m.ingyenesenUtazókSzáma}</div>
      <div>Kedvezményesen utazók száma: {m.kedvezményesenUtazókSzáma}</div>
    </div>
  );
}
