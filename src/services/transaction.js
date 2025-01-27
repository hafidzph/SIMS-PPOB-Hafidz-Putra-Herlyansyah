import api from "../config/apiConfig";

export function balance() {
  return api.get("/balance");
}

export function topup({ top_up_amount }) {
  return api.post("/topup", { top_up_amount });
}

export function serviceTransaction(service_code) {
  return api.post("/transaction", { service_code });
}

export function transactionHistory(offset) {
  return api.get("/transaction/history", {
    params: {
      offset: offset,
      limit: 5,
    },
  });
}
