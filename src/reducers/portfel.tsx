import {
  WCZYTAJ_PORTFEL,
  WCZYTAJ_LISTE_OBIEKTOW_PORTFELA,
  WCZYTAJ_LISTE_ELEMENTOW_PORTFELA,
  BLAD_PORTFEL,
  DAJ_PORTFEL,
  DAJ_LISTE_OBIEKTOW_PORTFELA,
  DAJ_LISTE_ELEMENTOW_PORTFELA,
  USTAW_ZAZNACZONY_OBIEKT,
   } from '../constants/actionTypes';
import { PortfelAction } from '../store/actions';
import Portfel from '../models/Portfel';

export type PortfelState = {
  data?: Portfel,  
  isLoading: boolean,
  selectedObject: number,
  error: string
}

const initialState: PortfelState = {
  data: undefined,
  isLoading: false,
  selectedObject: -1,
  error: ''
}


export const portfel = (state = initialState, action: PortfelAction) => {
  switch (action.type) {
    case WCZYTAJ_PORTFEL:
      return {
        ...state, 
        isLoading: true,   
        error: '', 
        data: [],
      };
    case WCZYTAJ_LISTE_OBIEKTOW_PORTFELA:
      return {
        ...state,
        isLoading: true,  
        error: '', 
        data: {
          ...state.data,
          mpObiektyPortfelas: []
        }                
      };
    case WCZYTAJ_LISTE_ELEMENTOW_PORTFELA:
      const wlep = {
        ...state,
        isLoading: true, 
        data: {
          ...state.data,
          mpObiektyPortfelas: {
          ...state.data?.mpObiektyPortfelas,
            [action.selectedObject]: {
              ...state.data?.mpObiektyPortfelas[action.selectedObject],  
              mpElementyPortfelas: [] 
            }              
          }
        }
      };
      return wlep;
    case BLAD_PORTFEL:
      return {
        ...state,
        isLoading: false,    
        error: action.blad        
      };  
    case DAJ_PORTFEL:
      return {
        ...state,       
        data: action.portfel,
        isLoading: false, 
      };
    case DAJ_LISTE_OBIEKTOW_PORTFELA:
      const check1 = {
        ...state,
          data: {
            ...state.data,
            mpObiektyPortfelas: action.listaObiektowPortfela                       
          },
        isLoading: false
      };
      return check1;
    case DAJ_LISTE_ELEMENTOW_PORTFELA:
      const check = {
        ...state,
        data: {
          ...state.data,
          mpObiektyPortfelas: {
          ...state.data?.mpObiektyPortfelas,
            [action.selectedObject]: {
              ...state.data?.mpObiektyPortfelas[action.selectedObject],  
              mpElementyPortfelas: action.listeElementowPortfela 
            }              
          },          
        },
        isLoading: false,         
        selectedObject: action.selectedObject
      };
      return check;     
    default:
      return state;
     }
   };