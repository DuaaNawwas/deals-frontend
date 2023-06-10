import { createContext, useEffect, useState } from "react";
import constants from "../constants";

const UserContext = createContext({});

const [loading, setLoading] = useState(true);
const [userSession, setUserSession] = useState(true);

useEffect(() => {
    const fetchUserAuth = async () => {
      try {
        setLoading(true)
        const res = await fetch(constants.SERVER_URL.concat('isAuth'))
        if (!res.ok) return setLoading(false)

        setUserSession(await res.json())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('There was an error fetch auth', error)
        return
      }
    }
    fetchUserAuth()
  }, [])


const UserProvider = ({ children }:
    { children: React.ReactNode }
  ) => {
    return (
        <UserContext.Provider value={{ userSession, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider