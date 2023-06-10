import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import UserProvider, { UserContext } from "./context/userContext";
import { useContext } from "react";
import RoutesComp from "./Routes";

function App() {
  return (
    <UserProvider>
        <Toaster
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
          position="bottom-center"
        />
        <RoutesComp />
    </UserProvider>
  );
}

export default App;
