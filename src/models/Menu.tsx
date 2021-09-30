import Tab from './Tab';

export default interface Menu {
     id: string,
     name: string,
     enable: boolean,     
     tab: Tab[]
}