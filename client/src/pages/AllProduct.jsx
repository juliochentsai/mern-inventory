import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/LevelBar";
import {
  TableContainer,
  SearchContainer,
  PageBtnContainer,
} from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useContext, createContext } from "react";

let FISHING_L0 = [
  "Reels",
  "Lures",
  "Accessories",
  "Rods",
  "Line, Hooks, Weights",
  "Glasses",
];
const AllProductsContext = createContext();
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/products", { params });

    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllProduct = () => {
  const { data, searchValues } = useLoaderData();
  const { numOfPages } = data;
  return (
    <Wrapper>
      <AllProductsContext.Provider value={{ data, searchValues }}>
        <div className="container">
          {FISHING_L0.map((text, index) => (
            <button key={index} className="level_item">
              {text}
            </button>
          ))}
        </div>
        <SearchContainer />
        <TableContainer />
        {numOfPages > 1 && <PageBtnContainer />}
      </AllProductsContext.Provider>
    </Wrapper>
  );
};

export const useAllProductsContext = () => useContext(AllProductsContext);
export default AllProduct;
