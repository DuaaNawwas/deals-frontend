import constants from "../constants";
import { IDealCreate, IDealUpdate } from "../types/deals.types";

const getAllDeals = async () => {
  return fetch(constants.SERVER_URL.concat("/deals"), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

const createDeal = async (deal: IDealCreate) => {
  return fetch(constants.SERVER_URL.concat("/deal"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Name: deal.Name,
      Description: deal.Description,
      Amount: deal.Amount,
      Currency: deal.Currency,
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const updateDeal = async (deal: IDealUpdate) => {
  return fetch(constants.SERVER_URL.concat("/deal"), {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...deal,
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const deleteDeal = async (id: number) => {
  return fetch(constants.SERVER_URL.concat("/deal"), {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then(async (res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export { getAllDeals, createDeal, updateDeal, deleteDeal };
