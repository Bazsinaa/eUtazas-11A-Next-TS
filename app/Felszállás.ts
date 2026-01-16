export default abstract class Felszállás {
  protected _megállóSorszáma: number;
  protected _idő: Date;
  protected _kártyaAzon: string;

  get érvényesFelszállás(): boolean {
    return false;
  }

  get megállóSorszáma(): number {
    return this._megállóSorszáma;
  }

  get ezIngyenesUtazás(): boolean {
    return false;
  }

  get ezKedvezményesUtazás(): boolean {
    return false;
  }

  public constructor(sor: string) {
    const m: string[] = sor.split(" ");
    this._megállóSorszáma = parseInt(m[0]);
    // felszállás időpontja: ééééhhnn-óópp
    const év = parseInt(m[1].slice(0, 4));
    const hónap = parseInt(m[1].slice(4, 6));
    const nap = parseInt(m[1].slice(6, 8));
    const óra = parseInt(m[1].slice(9, 11));
    const perc = parseInt(m[1].slice(11, 13));
    this._idő = new Date(év, hónap - 1, nap, óra, perc);
    this._kártyaAzon = m[2];
  }
}
