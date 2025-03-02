import { createContext, useReducer } from "react";

export const AppContext = createContext<any>([[], () => {}]);

const initialState = {
  alert: {
    show: false,
    message: "Text here",
    type: "failed",
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
