import { useContext, createContext } from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WebItemContainer } from "../components";
const AllWebViewContext = createContext();

const allWebViewsQuery = (params) => {
  const { search, sort, page } = params;
  return {
    queryKey: ["item", search ?? "", sort ?? "newest", page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get("/web", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allWebViewsQuery(params));
    return { searchValues: { ...params } };
  };

const WebView = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allWebViewsQuery(searchValues));

  return (
    <AllWebViewContext.Provider value={{ data, searchValues }}>
      <h2>Web View</h2>
      <WebItemContainer />
    </AllWebViewContext.Provider>
  );
};

export default WebView;

export const useAllWebViewContext = () => useContext(AllWebViewContext);
