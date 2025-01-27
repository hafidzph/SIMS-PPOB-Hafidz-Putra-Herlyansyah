import api from "../config/apiConfig";

export function banner() {
  return api.get("/banner");
}

export function services() {
  return api.get("/services");
}
