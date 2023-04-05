import * as React from 'react';

export interface HomeContextInterface {
  modalIsOpen: boolean;
  setModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const HomeContext = React.createContext<HomeContextInterface>({
  modalIsOpen:false,
  setModalIsOpen:()=>{}
});
