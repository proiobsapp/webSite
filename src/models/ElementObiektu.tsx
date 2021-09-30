import GrafikElementu from './GrafikElementu';

export default interface MpElementyObiektow {
     id: number,
     obId: number, 
     kod: string,
     nazwa: string,
     dataDodania: Date,
     dodal: string,
     zmodyfikowal: string,
     dataModyfikacji: Date,
     jestAktywny: string,
     typ: string,
     ikonaId: number,
     opis: string,
     mpGafikiElementows: GrafikElementu[]
 }