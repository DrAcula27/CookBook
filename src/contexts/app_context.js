import { useState, createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [mealsArray, setMealsArray] = useState([]);
  const [meal, setMeal] = useState("");
  const [searchQueries, setSearchQueries] = useState([]);
  const [mealId, setMealId] = useState("");

  // FUTURE WORK
  // const [cart, setCart] = useState({
  //   orderId: "",
  //   checkoutDone: false,
  //   updatedAt: "",
  //   orderItems: [],
  //   totalQty: 0,
  //   orderTotal: 0,
  // });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        searchQueries,
        setSearchQueries,

        mealsArray,
        setMealsArray,

        meal,
        setMeal,

        mealId,
        setMealId,

        // FUTURE WORK
        // cart,
        // setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
