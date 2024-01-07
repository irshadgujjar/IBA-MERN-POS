import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext("Initial Value");
import Cookies from "js-cookie";

const data = {
  user: "Irshad",
  token: Cookies.get("authToken") || undefined,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    Cookies.set("authToken", state.token);
  }, [state.token]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
