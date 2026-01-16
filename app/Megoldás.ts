import fs from "fs";
import Felszállás from "@/app/Felszállás";
import FelszállásBérlet from "@/app/FelszállásBérlet";
import FelszállásJegy from "@/app/FelszállásJegy";

// Típus a 4. feladathoz
type MaxKeresés = {
  maxFelszálló: number;
  maxMegálló: number;
};

export default class Megoldás {
  #utasadatok: Felszállás[] = [];

  get felszállókSzáma(): number {
    return this.#utasadatok.length;
  }

  get érvénytelenFelszállás(): number {
    return this.#utasadatok.filter((x) => !x.érvényesFelszállás).length;
  }

  get maxKeresésArray(): MaxKeresés {
    const max: MaxKeresés = { maxFelszálló: -1, maxMegálló: -1 };
    const statArray: number[] = new Array(30).fill(0);
    this.#utasadatok.forEach((e) => {
      statArray[e.megállóSorszáma]++;
    });
    max.maxFelszálló = Math.max(...statArray);
    max.maxMegálló = statArray.indexOf(max.maxFelszálló);
    return max;
  }

  get maxKereséseMap(): MaxKeresés {
    const max: MaxKeresés = { maxFelszálló: -1, maxMegálló: -1 };
    const statMap: Map<number, number> = new Map<number, number>();

    this.#utasadatok.forEach((e) => {
      if (statMap.has(e.megállóSorszáma)) {
        statMap.set(e.megállóSorszáma, statMap.get(e.megállóSorszáma)! + 1);
      } else {
        statMap.set(e.megállóSorszáma, 1);
      }
    });

    statMap.forEach((érték, kulcs) => {
      if (érték > max.maxFelszálló) {
        max.maxFelszálló = érték;
        max.maxMegálló = kulcs;
      }
    });
    return max;
  }

  constructor(forrás: string) {
    fs.readFileSync(forrás)
      .toString()
      .split("\n")
      .forEach((sor) => {
        const aktSor = sor.trim(); // maradék vezérlő karakterek eltávolítása
        const típus: string = aktSor.split(" ")[3];
        if (típus == "JGY") {
          this.#utasadatok.push(new FelszállásJegy(aktSor));
        } else {
          if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(típus)) {
            this.#utasadatok.push(new FelszállásBérlet(aktSor));
          }
        }
      });
  }
}
