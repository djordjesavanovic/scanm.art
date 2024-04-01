import React, { createContext, useContext, useState } from 'react';

const OffcanvasContext = createContext(null);

export const OffcanvasContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleOffcanvas = () => {
    setShow(!show);
  };

  return (
    <OffcanvasContext.Provider value={{ show, toggleOffcanvas }}>
      {children}
    </OffcanvasContext.Provider>
  );
};

export const useOffcanvasContext = () => {
  return useContext(OffcanvasContext);
};
