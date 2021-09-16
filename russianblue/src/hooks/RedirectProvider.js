import { createContext, useContext, useState } from "react";

export const redirectContext = createContext();

const RedirectProvider = (props) => {
  const [redirect, setRedirect] = useState("/");

  return (
    <redirectContext.Provider value={[redirect, setRedirect]}>
      {props.children}
    </redirectContext.Provider>
  );
};

export const useRedirect = () => {
  const [redirect, setRedirect] = useContext(redirectContext);
  return [redirect, setRedirect];
};

export default RedirectProvider;
