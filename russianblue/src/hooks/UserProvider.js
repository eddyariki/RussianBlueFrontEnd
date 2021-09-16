import { createContext, useState, useContext } from "react";

export const userContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState({
    accessToken: "",
    refreshToken: "",
    username: "",
    userId: -1,
    loggedIn: false,
    points: 0,
  });

  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const [user, setUser] = useContext(userContext);
  return [user, setUser];
};

export default UserProvider;
