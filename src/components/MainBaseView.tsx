import BaseView from './BaseView';
import Powiadomienie from '../models/Powiadomienie';

export default interface MainBaseView extends BaseView {
    dodajPowiadomienie(Powiadomienie: Powiadomienie): void; 
  }