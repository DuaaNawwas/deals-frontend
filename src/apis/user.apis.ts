import constants from "../constants";
import { IUserLogin } from "../types/user.types";

const loginUser = (user: IUserLogin) => {
  return fetch(constants.SERVER_URL.concat("/login"), {
    method: "POST",
    credentials : "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: user.Name,
      Password: user.Password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const logoutUser = () => {
    return fetch(constants.SERVER_URL.concat("/logout"), {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export { loginUser, logoutUser };
