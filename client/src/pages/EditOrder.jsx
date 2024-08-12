import {
  Form,
  redirect,
  useLoaderData,
  Link,
  useParams,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow, OrderRow, SubmitButtonSmall } from "../components";
import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import Wrapper from "../assets/wrappers/EditOrder";
import { toast } from "react-toastify";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = {
    third_party: data.third_party,
    date: data.date,
    order_type: data.order_type,
    comments: data.comments,
    orders: [],
  };
  Object.entries(data).forEach(([key, value]) => {
    const [baseKey, index] = key.split("-");

    if (index) {
      // Ensure the order array has enough space for the current index
      const idx = Number(index);
      result.orders[idx] = result.orders[idx] || {};
      result.orders[idx][baseKey] = value;
    }
  });

  result.orders = result.orders.filter(
    (orderItem) => orderItem.codigo && orderItem.descripcion && orderItem.cajas
  );

  try {
    await customFetch.patch(`/order/${params.id}`, result);
    return redirect("/dashboard/orders");
  } catch (error) {
    toast.error(error?.response.data?.msg);
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/order/${params.id}`);

    return data;
  } catch (err) {
    return redirect("/dashboard/orders");
  }
};

const EditOrder = () => {
  console.log("First Render");
  const { order } = useLoaderData();
  const [data, setData] = useState(false);
  const [numberRow, setNumberRow] = useState(0);
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    fetch("/api/v1/products")
      .then((response) => response.json())
      .then((data) => setMyProducts(data.products))
      .catch((error) =>
        toast.error(error?.response.data?.msg || "Error fetching products")
      );
  }, []);

  const fetchDescription = (codigo) => {
    const product = myProducts.find((p) => p.codigo === parseInt(codigo, 10));
    return product ? product.descripcion : "";
  };
  useEffect(() => {
    const transformed = {
      ...order,
      orders: order.orders.map((table, index) => ({
        [`codigo-${index}`]: table.codigo,
        [`descripcion-${index}`]: table.descripcion,
        [`cajas-${index}`]: table.cajas,
      })),
    };
    setData(transformed);
    setNumberRow(transformed.orders.length);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("codigo-")) {
      const [key, index] = name.split("-");
      setData((prevData) => {
        const updatedOrders = [...prevData.orders];
        updatedOrders[index] = {
          ...updatedOrders[index],
          [name]: value,
          [`descripcion-${index}`]: fetchDescription(value),
        };
        return { ...prevData, orders: updatedOrders };
      });
    } else if (name.startsWith("cajas-")) {
      const [key, index] = name.split("-");
      setData((prevData) => {
        const updatedOrders = [...prevData.orders];
        updatedOrders[index] = {
          ...updatedOrders[index],
          [name]: value,
        };
        return { ...prevData, orders: updatedOrders };
      });
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const increaseRows = () => {
    const newOrder = {
      [`codigo-${numberRow}`]: 0,
      [`descripcion-${numberRow}`]: "",
      [`cajas-${numberRow}`]: 0,
    };
    setData((prevData) => ({
      ...prevData,
      orders: [...prevData.orders, newOrder],
    }));
    setNumberRow(numberRow + 1); // Ensure the row index is incremented
  };

  const ORDER_TYPE = ["order", "purchase"];

  // Function to convert ISO date to YYYY-MM-DD
  const formatDate = (isoDate) => {
    return isoDate.split("T")[0];
  };

  // Handle date input change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const formattedDate = new Date(newDate).toISOString();
    setData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
  };
  return (
    <Wrapper>
      <Form method="post">
        {data && (
          <div className="label-top-box">
            <div className="label-box">
              <label htmlFor="order_type" className="label">
                DATE
              </label>
              <input
                className="calendar"
                type="date"
                name="date"
                value={formatDate(data.date) || ""}
                onChange={handleDateChange}
              />
            </div>
            <div className="label-box">
              <label htmlFor="order_type" className="label">
                ORDER TYPE
              </label>
              <select
                className="label-box-input"
                name="order_type"
                defaultValue={data.order || ""}
                onChange={handleInputChange}
              >
                {ORDER_TYPE.map((itemValue) => {
                  return (
                    <option key={itemValue} value={itemValue}>
                      {itemValue}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="label-box">
              <label htmlFor="third_party" className="label">
                THIRD PARTY
              </label>
              <input
                className="label-box-input"
                type="text"
                id="third_party"
                name="third_party"
                value={data.third_party || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="label-box">
              <label htmlFor="comments" className="label">
                COMMENTS
              </label>
              <input
                className="label-box-input"
                type="text"
                id="comments"
                name="comments"
                value={data.comments || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        <div className="order_table">
          <div className="row top_table_label">
            <div className="label-box">
              <label className="label_title">CODIGO</label>
            </div>
            <div className="label-box">
              <label className="label_title description-label">
                DESCRIPCION
              </label>
            </div>

            <div className="label-box">
              <label className="label_title">CAJAS</label>
            </div>
          </div>
          {data &&
            Array.from(
              { length: data.orders.length },
              (_, index) => index + 1
            ).map((number) => (
              <div key={number - 1} className="row">
                <OrderRow
                  type="number"
                  name={`codigo-${number - 1}`}
                  value={data.orders[number - 1][`codigo-${number - 1}`] || ""}
                  onChange={handleInputChange}
                />

                <input
                  className="description-box"
                  type="text"
                  name={`descripcion-${number - 1}`}
                  value={
                    data.orders[number - 1][`descripcion-${number - 1}`] || ""
                  }
                  readOnly
                />
                <OrderRow
                  type="number"
                  name={`cajas-${number - 1}`}
                  value={data.orders[number - 1][`cajas-${number - 1}`] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          <button
            type="button"
            className="add-row-button"
            onClick={increaseRows}
          >
            <MdAddBox />
          </button>
        </div>

        <SubmitButtonSmall />
      </Form>
    </Wrapper>
  );
};

export default EditOrder;
