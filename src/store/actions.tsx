import * as actions from '../constants/actionTypes';
import Portfel from '../models/Portfel';
import ObiektPortfela from '../models/ObiektPortfela';
import ElementPortfela from '../models/ElementPortfela';
import Tab from '../models/Tab';

/**
   * MENU
*/
export const dajMenu = () => ({
     type: actions.DAJ_MENU as typeof actions.DAJ_MENU
   })
export type dajMenuAction = ReturnType<typeof dajMenu>

export type MenuAction =
  | dajMenuAction;


/**
   * PORTFEL
*/

export const wczytajPortfel = () => ({
   type: actions.WCZYTAJ_PORTFEL as typeof actions.WCZYTAJ_PORTFEL
 })
export type wczytajPortfelAction = ReturnType<typeof wczytajPortfel>

export const wczytajListeObiektowPortfela = () => ({
   type: actions.WCZYTAJ_LISTE_OBIEKTOW_PORTFELA as typeof actions.WCZYTAJ_LISTE_OBIEKTOW_PORTFELA
 })
export type wczytajListeObiektowPortfelaAction = ReturnType<typeof wczytajListeObiektowPortfela>

export const wczytajListeElementowPortfela = (selectedObject: number) => ({
   type: actions.WCZYTAJ_LISTE_ELEMENTOW_PORTFELA as typeof actions.WCZYTAJ_LISTE_ELEMENTOW_PORTFELA,
   selectedObject
 })
export type wczytajListeElementowPortfelaAction = ReturnType<typeof wczytajListeElementowPortfela>

export const dajPortfel = (portfel: Portfel) => ({
     type: actions.DAJ_PORTFEL as typeof actions.DAJ_PORTFEL,
     portfel
   })
export type dajPortfelAction = ReturnType<typeof dajPortfel>

export const bladPortfel = (blad: string) => ({
   type: actions.BLAD_PORTFEL as typeof actions.BLAD_PORTFEL,
   blad
 })
export type bladPortfelAction = ReturnType<typeof bladPortfel>

export const dajListeObiektowPortfela = (listaObiektowPortfela: ObiektPortfela[]) => ({
     type: actions.DAJ_LISTE_OBIEKTOW_PORTFELA as typeof actions.DAJ_LISTE_OBIEKTOW_PORTFELA,
     listaObiektowPortfela
   })
export type dajListeObiektowPortfelaAction = ReturnType<typeof dajListeObiektowPortfela>

export const dajListeElementowPortfela = (selectedObject: number, listeElementowPortfela: ElementPortfela[]) => ({
     type: actions.DAJ_LISTE_ELEMENTOW_PORTFELA as typeof actions.DAJ_LISTE_ELEMENTOW_PORTFELA,
     selectedObject,
     listeElementowPortfela
   })
export type dajListeElementowPortfelaAction = ReturnType<typeof dajListeElementowPortfela>

export const ustawZaznaczonyObiekt = (selectedObject: number) => ({
   type: actions.USTAW_ZAZNACZONY_OBIEKT as typeof actions.USTAW_ZAZNACZONY_OBIEKT,
   selectedObject
 })
export type ustawZaznaczonyObiektAction = ReturnType<typeof ustawZaznaczonyObiekt>


export type PortfelAction =
  | dajPortfelAction
  | bladPortfelAction
  | dajListeObiektowPortfelaAction
  | dajListeElementowPortfelaAction
  | wczytajPortfelAction
  | wczytajListeObiektowPortfelaAction
  | wczytajListeElementowPortfelaAction
  | ustawZaznaczonyObiektAction;


/**
   * TAB
*/

export const dodajTab = (tabs: Tab[]) => ({
     type: actions.DODAJ_TAB as typeof actions.DODAJ_TAB,
     tabs
  })
export type dodajTabAction = ReturnType<typeof dodajTab>

export const zaznaczTab = (indeks: number) => ({
   type: actions.ZAZNACZ_TAB as typeof actions.ZAZNACZ_TAB,
   indeks
})
export type zaznaczTabAction = ReturnType<typeof zaznaczTab>

export type TabAction =
  | dodajTabAction
  | zaznaczTabAction;
  