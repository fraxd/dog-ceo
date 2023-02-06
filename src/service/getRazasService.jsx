import { razasApi } from "../api/razasApi";

export const GetRazasServices = async () => {
  const resp = await razasApi.get("/breeds/list/all");
  return Object.entries(resp.data.message);
};
