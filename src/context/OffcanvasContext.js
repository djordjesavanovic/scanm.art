import React, { createContext, useContext, useState } from 'react';

const OffcanvasContext = createContext(null);

export const OffcanvasProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleOffcanvas = () => {
    console.log('triggered');
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
