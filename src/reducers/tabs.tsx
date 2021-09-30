import { DODAJ_TAB, ZAZNACZ_TAB } from '../constants/actionTypes';
import { TabAction } from '../store/actions';
import Tab from '../models/Tab';
 
export type TabState = {
  data?: Tab[],  
  loading: boolean,
  selected: number
}


const initialMenuState: TabState = {
   data: [],
   loading: false,
   selected: 0
}


export const tabs = (state = initialMenuState, action: TabAction) => {
     switch (action.type) {
          case DODAJ_TAB:
            return {
              ...state,  
              data: action.tabs           
            };   
          case ZAZNACZ_TAB:
            return {
              ...state,
              selected: action.indeks              
            };          
          default:
            return state;
        }
     };    