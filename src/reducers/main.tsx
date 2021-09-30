import { DAJ_MENU } from '../constants/actionTypes';
import { MenuAction } from '../store/actions';
import Menu from '../models/Menu';
import { ReactComponent as WindSVG } from '../assets/svg/wind.svg';
import MainMenu from '../components/MainMenu';
 
export type MenuState = {
  data?: Menu[],  
  loading: boolean
}


const initialMenuState: MenuState = 
  {
    data: [{
       id: 'SF_PROG',
       name: 'Prognoza',
       enable: true,     
       tab: [
            {
                 id: 'SF_PANEL_PROGNOZ',
                 name: 'Panel prognoz',
                 description: 'Panel prognoz',
                 enable: true,
                 isReadOnly: true,
                 icon: <WindSVG height={25} width={25}/>,
                 body: <div> <label>{'test Majsterka'}</label> </div>, 
                 tab: [],
            }          
          ]
        }],
        loading: false
    }


export const menu = (state = initialMenuState, action: MenuAction) => {
     switch (action.type) {
          case DAJ_MENU:
            return {
              ...state,        
              data: MainMenu,        
            };          
          default:
            return state;
        }
     };    