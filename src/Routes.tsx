import { FC, memo } from "react";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";

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
