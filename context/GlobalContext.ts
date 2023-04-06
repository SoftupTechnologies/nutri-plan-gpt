import * as React from 'react';

export interface GlobalContextInterface {
  modalIsOpen: boolean;
  setModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
  isContentGenerated:boolean;
  setIsContentGenerated:React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({
  modalIsOpen:false,
  setModalIsOpen:()=>{},
  isContentGenerated:false,
  setIsContentGenerated:()=>{}
});
