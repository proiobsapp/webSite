import Menu from '../models/Menu';
import { PortfelComponent } from './PortfelComponent';
import { ReactComponent as SunSVG } from '../assets/svg/sun.svg';

const MainMenu: Menu[] = [
     {
          id: 'PORTFEL',
          name: 'Portfel',
          enable: true,     
          tab: [
               {
                    id: 'PORTFEL',
                    name: 'Portfel',
                    description: 'Portfel',
                    enable: true,
                    isReadOnly: true,
                    icon: <SunSVG height={20} width={20}/>,
                    body: <div> <PortfelComponent/> </div>, 
                    tab: [],
               }
          ] 
     }
];

export default MainMenu;
