import ElementObiektu from './ElementObiektu';

export default interface ElementPortfela {
    portfelId: number,
    obiektPortfelaId: number,
    elementId: number,
    kolejnosc: number,
    poziom: number,
    nazwaWlasna: string,
    ikonaId?: number,
    wykresXml: string,
    wykresKolejnosc?: number,
    element: ElementObiektu,
    naWykresie: boolean
 }