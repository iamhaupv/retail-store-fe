// ShelfContext.js
import React, { createContext, useContext, useState } from 'react';

// Tạo context
const ShelfContext = createContext();

// Tạo provider
export const ShelfProvider = ({ children }) => {
  const [shelf, setShelf] = useState('');

  return (
    <ShelfContext.Provider value={{ shelf, setShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};

// Hook để sử dụng context
export const useShelfContext = () => useContext(ShelfContext);
