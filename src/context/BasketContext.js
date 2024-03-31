import { createContext, useContext, useEffect, useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const BasketContext = createContext(null);

export const BasketContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [basketID, setBasketID] = useState('');

  const saveItem = ({ code, itemName }) => {
    const item = {
      code,
      itemName,
    };
    setItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    const saveBasket = async () => {
      await set(ref(db, `/baskets/${basketID}`), items);
    };

    if (items.length > 0) {
      saveBasket();
    }
  }, [basketID, items]);

  return (
    <BasketContext.Provider value={{ items, saveItem, setBasketID }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => {
  return useContext(BasketContext);
};
