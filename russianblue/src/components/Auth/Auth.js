import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useRedirect } from "../../hooks/RedirectProvider";
import { useUser } from "../../hooks/UserProvider";
import { privateRoutes } from "../../routes";

export default function Auth() {
  const [user, setUser] = useUser();
  const [redirect, setRedirect] = useRedirect();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log(location);
    if (privateRoutes.includes(location.pathname) && !user.loggedIn) {
      setRedirect(location.pathname);
      history.push("/login");
    }
  }, [location]);
  return <div></div>;
}
