import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchAllResponse } from "../services/apiClient";
import House from "../interfaces/House";
import useHouseQuery from "../store";

const apiClient = new APIClient<House>("/house");

const useHouses = () => {
  const houseQuery = useHouseQuery((s) => s.houseQuery);

  return useInfiniteQuery<FetchAllResponse<House>, Error>({
    queryKey: ["house", houseQuery],
    queryFn: ({ pageParam }) =>
      apiClient.getAll({
        params: {
          propertyType: houseQuery.propertyType,
          sortOrder: houseQuery.sortOrder,
          searchText: houseQuery.searchText,
          minPrice: houseQuery.minPrice,
          maxPrice: houseQuery.maxPrice,
          maxRating: houseQuery.maxRating,
          minRating: houseQuery.minRating,
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

export default useHouses;
