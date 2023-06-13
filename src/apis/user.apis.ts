import constants from "../constants";
import { IUserLogin } from "../types/user.types";

const registerUser = (user: any) => {
  return fetch(constants.SERVER_URL.concat("/register"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

const loginUser = (user: IUserLogin) => {
  return fetch(constants.SERVER_URL.concat("/login"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: user.Name,
      Password: user.Password,
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const logoutUser = () => {
  return fetch(constants.SERVER_URL.concat("/logout"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const getAllUsers = () => {
  return fetch(constants.SERVER_URL.concat("/users"), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

const deleteUsers = (ids: number[]) => {
  return fetch(constants.SERVER_URL.concat("/users"), {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

const updateUser = (user: any) => {
  return fetch(constants.SERVER_URL.concat("/user"), {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

export { loginUser, logoutUser, getAllUsers, deleteUsers, updateUser, registerUser };
