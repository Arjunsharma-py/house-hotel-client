import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Booking from "../interfaces/Booking";

const apiClient = new APIClient<Booking>("/book");

const useBooking = (id: number | string) =>
  useQuery({
    queryKey: ["booking", id],
    queryFn: () => apiClient.getById(id),
  });

export default useBooking;
