import { createContext, useState, useContext, useEffect } from "react";
import { djangoApiInstance, rakutenApiInstance } from "../axios";

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
  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId !== -1 && !user.loggedIn) {
        try {
          const res = await djangoApiInstance.get(`/profile/${userId}`);
          setUser({
            username: res.data.username,
            userId: res.data.userId,
            points: res.data.points,
            loggedIn: true,
          });
        } catch (e) {
          console.log("failed to get user information");
        }
      }
    };
    getUser();
  }, []);
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
