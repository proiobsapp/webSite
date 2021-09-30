import TypPowiadomienia  from './TypPowiadomienia';

export default interface Powiadomienie {
     tytul: string,
     opis: string,
     typ: TypPowiadomienia,
     dataDodania: Date
 }