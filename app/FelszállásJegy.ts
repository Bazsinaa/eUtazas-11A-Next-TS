import Felszállás from "@/app/Felszállás";

export default class FelszállásJegy extends Felszállás {
  #jegyekSzáma: number;

  get érvényesFelszállás(): boolean{
    return this.#jegyekSzáma > 0;
  }


  public constructor(sor: string) {
    // Szülő (ős) osztály konstruktorának a hívása:
    super(sor);
    this.#jegyekSzáma = parseInt(sor.split(" ")[4]);
  }
}
