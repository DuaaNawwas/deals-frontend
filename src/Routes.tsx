import { FC, memo } from "react";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

const RoutesComp: FC = () => {
  const { userSession, loading } = useContext(UserContext);
  return (
    <>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <Routes>
          {userSession && (
            <>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                {userSession && userSession.Role === "Admin" && (
                  <Route path="dashboard" element={<Dashboard />} />
                )}
              </Route>
            </>
          )}

          {!userSession && <Route path="/" element={<Login />} />}
        </Routes>
      )}
    </>
  );
};

export default RoutesComp;
