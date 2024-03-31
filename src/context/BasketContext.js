import { createContext, useContext, useEffect, useState } from 'react';

const BasketContext = createContext(null);

export const BasketContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const saveItem = ({ code, itemName }) => {
    const item = {
      code,
      itemName,
    };
    setItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    if (items.length > 0) {
      console.log('ITEMS: ', items);
    }
  }, [items]);

  return (
    <BasketContext.Provider value={{ items, saveItem }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => {
  return useContext(BasketContext);
};
