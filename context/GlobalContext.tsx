import { FastingRequestType } from '@/lib/types';
import React, { useState } from 'react';

export interface GlobalContextInterface {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContentGenerated: boolean;
  setIsContentGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  formValues: FastingRequestType;
  setFormValues: React.Dispatch<React.SetStateAction<FastingRequestType>>;
}
export const GlobalContext = React.createContext<GlobalContextInterface>({
  modalIsOpen: false,
  setModalIsOpen: () => {},
  isContentGenerated: false,
  setIsContentGenerated: () => {},
  formValues: {
    ingredients: "",
    fastingType: "16:8",
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 0,
  },
  setFormValues: () => {},
});

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isContentGenerated, setIsContentGenerated] = useState(false);
  const [formValues, setFormValues] = useState<FastingRequestType>({
    ingredients: "",
    fastingType: "16:8",
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 0,
  });

  const initialContextValue: GlobalContextInterface = {
    modalIsOpen,
    setModalIsOpen,
    isContentGenerated,
    setIsContentGenerated,
    formValues,
    setFormValues,
  };

  return (
    <GlobalContext.Provider value={initialContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
