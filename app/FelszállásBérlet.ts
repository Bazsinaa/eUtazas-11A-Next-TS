import { BlobOptions } from "buffer";
import Felszállás from "@/app/Felszállás";

export default class FelszállásBérlet extends Felszállás {
  #típus: string;
  #érvényes: Date;

  get érvényesFelszállás(): boolean {
    return this._idő <= this.#érvényes;
  }

    get ezIngyenesUtazás(): boolean {
    if (this.érvényesFelszállás && ["NYP", "RVS", "GYK"].includes(this.#típus)){
      return true;
    }
    return false;
  }

  get ezKedvezményesUtazás(): boolean {
    if (this.érvényesFelszállás && ["TAB", "NYB"].includes(this.#típus)){
      return true;
    }
    return false;
  }

  constructor(sor: string) {
    super(sor);
    const m: string[] = sor.split(" ");
    this.#típus = m[3];
    const év = parseInt(m[4].slice(0, 4));
    const hónap = parseInt(m[4].slice(4, 6));
    const nap = parseInt(m[4].slice(6, 8));
    this.#érvényes = new Date(év, hónap - 1, nap, 23, 59);
  }
}
