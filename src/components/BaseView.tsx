export default interface BaseView {
     onViewModelChanged(): void;   
     onShowMessage(message: string): void;  
     showWait(value: boolean, message?: string): void;
   }