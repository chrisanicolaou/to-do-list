import { useNavigate } from "solid-app-router";

export const redirect = () => {
  if (!localStorage.getItem("user")) {
    const navigation = useNavigate();
    navigation("/");
  }
};

export const checkEmptyFields = (obj) => {
  for (let key in obj) {
    if (!obj[key]) {
      console.log("rejecting");
      return Promise.reject(key);
    }
  }
};

export const getFromStorage = (key) => {
  const result = localStorage.getItem(key);
  if (!result) return false;
  return JSON.parse(result);
};

export const setToStorage = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const setToUserStorage = (obj) => {
  setToStorage("user", obj);
};

export const useUser = () => {
  return [getFromStorage("user"), setToUserStorage];
};
