import { createContext, useEffect, useState } from "react";
import constants from "../constants";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<any>({});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true);
        const res = await fetch(constants.SERVER_URL.concat("/isAuth"), {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) return setLoading(false);

        setUserSession(await res.json());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("There was an error fetch auth", error);
        return;
      }
    };
    fetchUserAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userSession, loading, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
