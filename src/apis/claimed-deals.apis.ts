import constants from "../constants";

const claimDeal = async (Deal_ID: number) => {
  return fetch(constants.SERVER_URL.concat("/claim-deal"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Deal_ID,
    }),
  })
    .then(async (res) => {
      if (res.status === 401) {
        return { error: "Unauthorized" };
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

const getClimedDealsByUser = async () => {
  return fetch(constants.SERVER_URL.concat("/claimed-deals/user"), {
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

export { claimDeal, getClimedDealsByUser };
