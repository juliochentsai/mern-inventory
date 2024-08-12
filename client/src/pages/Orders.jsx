import Wrapper from "../assets/wrappers/OrderPage";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { OrderPageBtnContainer, OrderBlock } from "../components";
import { createContext, useContext } from "react";
const AllOrdersContext = createContext();
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customFetch.get("/order", { params });
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Orders = () => {
  const { data } = useLoaderData();
  const { order, numOfPages } = data;

  return (
    <Wrapper>
      <AllOrdersContext.Provider value={{ data }}>
        <div className="container">
          <section className="header-box">
            <div className="header-box-item">DATE</div>
            <div className="header-box-item">ORDER TYPE</div>
            <div className="header-box-item">THIRD PARTY</div>
            <div className="header-box-item">STATUS</div>
          </section>
          {order.map((order) => (
            <OrderBlock key={order._id} {...order} />
          ))}
        </div>
        {numOfPages > 1 && <OrderPageBtnContainer />}
      </AllOrdersContext.Provider>
    </Wrapper>
  );
};
export const useAllOrderContext = () => useContext(AllOrdersContext);
export default Orders;
