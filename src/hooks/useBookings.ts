import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchAllResponse } from "../services/apiClient";
import useHouseQuery from "../store";
import Booking from "../interfaces/Booking";

const apiClient = new APIClient<Booking>("/book");

const useBookings = () => {
  const houseQuery = useHouseQuery((s) => s.houseQuery);

  return useInfiniteQuery<FetchAllResponse<Booking>, Error>({
    queryKey: ["books", houseQuery],
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"),
  });
};

export default useBookings;
