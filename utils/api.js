import axios from "axios";

const toDoApi = axios.create({
  baseURL: "https://dotnet-to-do-api.herokuapp.com/api"
});

export const getReq = async (path) => {
  const res = await toDoApi.get(path);
  return res.data;
};

export const patchReq = async (path, dataToPatch) => {
  const res = await toDoApi.patch(path, dataToPatch);
  return res.data;
};

export const putReq = async (path, dataToPut) => {
  const res = await toDoApi.put(path, dataToPut);
  return res.data;
};

export const postReq = async (path, dataToPost) => {
  const res = await toDoApi.post(path, dataToPost);
  return res.data;
};

export const deleteReq = async (path) => {
  await toDoApi.delete(path);
};
