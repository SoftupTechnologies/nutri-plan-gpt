import * as React from 'react';

export interface MenuSectionContentInterface {
  modalIsOpen: boolean;
  setModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuSectionContext = React.createContext<MenuSectionContentInterface>({
  modalIsOpen:false,
  setModalIsOpen:()=>{}
});
