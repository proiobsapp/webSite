import ObiektPortfela from './ObiektPortfela';

export default interface Portfel {
     id: number,
     nazwa: string,
     dodal: string,
     zmodyfikowal: string,
     dataDodania: Date,
     dataModyfikacji?: Date,
     jestAktywny: string,
     kostkaId: number,
     mpObiektyPortfelas: ObiektPortfela[]
 }