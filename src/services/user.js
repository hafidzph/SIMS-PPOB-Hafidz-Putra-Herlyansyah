import api from "../config/apiConfig";

export function register(user) {
  return api.post("/registration", user);
}

export function login(user) {
  return api.post("/login", user);
}

export function profile() {
  return api.get("/profile");
}

export function updateProfile(user) {
  return api.put("/profile/update", user);
}

export function updateProfileImage(formData) {
  return api.put("/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
