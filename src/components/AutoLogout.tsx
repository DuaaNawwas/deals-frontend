import { FC, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { logoutUser } from "../apis/user.apis";
import constants from "../constants";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

interface AutoLogoutProps {
  children: React.ReactNode;
}

const AutoLogout = ({ children }: AutoLogoutProps) => {
  const { userSession } = useContext(UserContext);

  useEffect(() => {
    const handleEvent = async () => {
      try {
        const res = await fetch(constants.SERVER_URL.concat("/isAuth"), {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok || res.status === 401) {
          localStorage.setItem("autoLogout", "true");
          window.location.pathname = "/";
        }
      } catch (error) {
        console.error("There was an error fetching auth", error);
        return;
      }
      if (!userSession) {
        logoutAction();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleEvent);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, []);

  const logoutAction = () => {
    logoutUser().then((res) => {
      if (!res.error) {
        localStorage.setItem("autoLogout", "true");
        window.location.pathname = "/";
      } else {
        console.log(res.error);
      }
    });
  };

  return <>{children}</>;
};

export default AutoLogout;
