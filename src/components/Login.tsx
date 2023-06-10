import { FC, memo, useState } from "react";
import { loginUser, logoutUser } from "../apis/user.apis";
import toast from "react-hot-toast";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
    const [userData, setUserData] = useState({
        Name: "",
        Password: ""
    })

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        loginUser(userData).then((res) => {
            console.log(res)
            if(res) {
                setIsLoggedIn(true)
                toast.success("Login Successful")
                window.location.reload()
            } else {
                toast.error("Login Failed")
            }
        } )
    }


  return (
    <>
    {/* {isLoggedIn ? <button onClick={handleLogout}>Logout</button>: */}
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
          name= "Name"
            type="text"
            placeholder="username"
            className="input input-bordered"
            onChange={handleChange}
            value={userData.Name}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name= "Password"
            type="text"
            placeholder="password"
            className="input input-bordered"
            onChange={handleChange}
            value={userData.Password}
          />

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default memo(Login);
