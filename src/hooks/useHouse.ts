import { useQuery } from "@tanstack/react-query";
import House from "../interfaces/House";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<House>("/house");

const useHouse = (id: number | string) =>
  useQuery({
    queryKey: ["house", id],
    queryFn: () => apiClient.getById(id),
  });

export default useHouse;
