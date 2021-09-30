import ElementPortfela from './ElementPortfela';

export default interface ObiektPortfela {
     portfelId: number,
     obId: number,
     kolejnosc: number,
     poziom: number,
     nazwaWlasna: string,
     ikonaId?: number,
     mpElementyPortfelas: ElementPortfela[]
  }