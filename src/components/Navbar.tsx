import { FC, memo, useContext } from "react";
import { logoutUser } from "../apis/user.apis";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const navigator = useNavigate();
  const { userSession } = useContext(UserContext);
  const handleLogout = () => {
    logoutUser().then((res) => {
      if (!res.error) {
        toast.success("Logout Successful");
        window.location.pathname = "/";
      } else {
        toast.error(res.error);
      }
    });
  };
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a
          onClick={() => {
            navigator("/");
          }}
          className="btn btn-ghost normal-case text-xl"
        >
          Dealsat
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={`https://ui-avatars.com/api/?name=${userSession.Name}`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
          >
            <li
              onClick={() => {
                navigator("/profile");
              }}
            >
              <a className="justify-between">Profile</a>
            </li>
            {userSession.Role === "Admin" && (
              <li
                onClick={() => {
                  navigator("/dashboard");
                }}
              >
                <a>Dashboard</a>
              </li>
            )}
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);
