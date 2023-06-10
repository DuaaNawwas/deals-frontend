import { FC, memo, useState } from "react";
import { loginUser } from "../apis/user.apis";
import toast, { LoaderIcon } from "react-hot-toast";

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    Name: "",
    Password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if(!userData.Name || !userData.Password) return toast.error("Please fill all the fields");
    setLoading(true);
    try {
     const res = await loginUser(userData)
     if (!res.error) {
         toast.success("Login Successful");
         window.location.reload();
       } else {
          setLoading(false);
         toast.error(res.error);
       }
    }
    catch (err) {
        console.log(err)
    }
  };

  return (
    <div className="flex justify-start items-center w-screen h-screen">
      <div className="card mx-auto w-full max-w-sm shadow-2xl bg-base-300">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              name="Name"
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
              name="Password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              onChange={handleChange}
              value={userData.Password}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={loading || 
            !userData.Name || !userData.Password
            } onClick={handleLogin}>
             {loading && <LoaderIcon />} 
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
