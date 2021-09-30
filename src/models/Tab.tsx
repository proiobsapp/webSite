export default interface Tab {
     id: string,
     name: string,
     description: string,
     enable: boolean,
     isReadOnly: boolean,
     icon: any,
     body: any,
     tab: Tab[]
}