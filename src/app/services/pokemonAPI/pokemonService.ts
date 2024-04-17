import axiosInstance from "../axios-wrapper";

export const getData = async () => {
  try {
    const { data } = await axiosInstance.get("/api/pokemon");
    return data || [];
  } catch (error) {
    return "";
  }
};
