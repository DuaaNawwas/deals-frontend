import { FC, memo, useState, useEffect } from "react";
import { loginUser } from "../apis/user.apis";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";

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
    if (!userData.Name || !userData.Password)
      return toast.error("Please fill all the fields");
    setLoading(true);
    try {
      const res = await loginUser(userData);
      if (!res.error) {
        toast.success("Login Successful");
        window.location.reload();
      } else {
        setLoading(false);
        toast.error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const autoLogout = localStorage.getItem("autoLogout");
    if (autoLogout) {
      window.autologoutmodal.showModal()
      localStorage.removeItem("autoLogout");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center gap-10 items-center w-screen h-screen">
      <dialog id="autologoutmodal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Your session timed out!</h3>
          <p className="py-4">
            Please login again to continue using the application
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
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
            <button
              className="btn btn-primary"
              disabled={loading || !userData.Name || !userData.Password}
              onClick={handleLogin}
            >
              {loading && <LoaderIcon />}
              Login
            </button>
          </div>
          <label className=" flex gap-1">
            <span className="label-text-alt">Don't have an account?</span>
            <Link to={'/register'} className="label-text-alt link link-hover">Register</Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
