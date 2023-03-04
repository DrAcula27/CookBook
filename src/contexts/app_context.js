import { useState, createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [cart, setCart] = useState({
    orderId: "",
    checkoutDone: false,
    updatedAt: "",
    orderItems: [],
    totalQty: 0,
    orderTotal: 0,
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
