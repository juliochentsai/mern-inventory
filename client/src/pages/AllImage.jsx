import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Image, SearchImageContainer } from "../components";
import Wrapper from "../assets/wrappers/AllImage";
import { useContext, createContext } from "react";
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/images", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllImagesContext = createContext();

const AllImage = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <Wrapper>
      <AllImagesContext.Provider value={{ data, searchValues }}>
        <SearchImageContainer />
        <table className="table-container">
          <thead>
            <tr className="table-head-container">
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.images.map((x, ind) => {
              return <Image key={x._id} {...x} ind={ind} />;
            })}
          </tbody>
        </table>
      </AllImagesContext.Provider>
    </Wrapper>
  );
};

export const useAllImagesContext = () => useContext(AllImagesContext);
export default AllImage;
