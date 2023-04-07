import React, { useState } from 'react';

export interface HomeContextInterface {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContentGenerated: boolean;
  setIsContentGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomeContext = React.createContext<HomeContextInterface>({
  modalIsOpen: false,
  setModalIsOpen: () => { },
  isContentGenerated: false,
  setIsContentGenerated: () => { },
});

interface HomeContextProviderProps {
  children: React.ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isContentGenerated, setIsContentGenerated] = useState(false);

  const initialContextValue: HomeContextInterface = {
    modalIsOpen,
    setModalIsOpen,
    isContentGenerated,
    setIsContentGenerated,
  }

  return (
    <HomeContext.Provider value={initialContextValue}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
