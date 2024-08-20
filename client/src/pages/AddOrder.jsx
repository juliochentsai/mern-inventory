import { Form, redirect, useNavigate } from "react-router-dom";
import { OrderRow, SubmitButtonSmall } from "../components";
import Wrapper from "../assets/wrappers/AddOrder";
import { useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { MdAddBox } from "react-icons/md";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const result = {
    third_party: data.third_party,
    date: data.date,
    order_type: data.order_type,
    comments: data.comments,
    orders: [],
  };

  // Iterate over the keys of the input object
  Object.entries(data).forEach(([key, value]) => {
    const [baseKey, index] = key.split("-");

    if (index) {
      // Ensure the order array has enough space for the current index
      const idx = Number(index) - 1;
      result.orders[idx] = result.orders[idx] || {};
      result.orders[idx][baseKey] = value;
    }
  });

  result.orders = result.orders.filter(
    (orderItem) => orderItem.codigo && orderItem.descripcion && orderItem.cajas
  );

  try {
    await customFetch.post("/order", result);
    localStorage.removeItem("numberOfDivs");
    localStorage.removeItem("formValues");
    return redirect("/dashboard/orders");
  } catch (error) {
    toast.error(error?.response.data?.msg);
    return error;
  }
};

const AddOrder = () => {
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    fetch("/api/v1/products")
      .then((response) => response.json())
      .then((data) => setMyProducts(data.products))
      .catch((error) => toast.error(error?.response.data?.msg));
  }, []);

  const fetchDescription = (codigo) => {
    const product = myProducts.find((p) => p.codigo === parseInt(codigo, 10));
    return product ? product.descripcion : "";
  };

  //UseState for # of Rows
  const [numberOfDivs, setNumberOfDivs] = useState(() => {
    const savedNumber = localStorage.getItem("numberOfDivs");
    return savedNumber ? JSON.parse(savedNumber) : 10;
  });
  const divs = Array.from({ length: numberOfDivs }, (_, index) => index + 1);

  const increaseRows = () => {
    setNumberOfDivs((prevNumber) => {
      const newNumber = prevNumber + 1;
      localStorage.setItem("numberOfDivs", JSON.stringify(newNumber));
      return newNumber;
    });
  };

  const [formValues, setFormValues] = useState(() => {
    try {
      const savedValues = localStorage.getItem("formValues");
      return savedValues ? JSON.parse(savedValues) : {};
    } catch (error) {
      console.error("Error parsing saved form values:", error);
      return {};
    }
  });

  const handleInputChange = (rowIndex, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      // const newValues = { ...prevValues, [`${name}-${rowIndex}`]: value };
      const newValues = { ...prevValues, [`${name}`]: value };
      if (name.startsWith("codigo")) {
        newValues[`descripcion-${rowIndex}`] = fetchDescription(value);
      }

      localStorage.setItem("formValues", JSON.stringify(newValues));
      return newValues;
    });
  };

  const handleOtherInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      localStorage.setItem("formValues", JSON.stringify(newValues));
      return newValues;
    });
  };

  const handleCancel = () => {
    // Clear form values
    setFormValues({});
    localStorage.removeItem("formValues");
    localStorage.removeItem("numberOfDivs");

    // Redirect to another page (e.g., dashboard)
    navigate("/dashboard/orders");
  };
  const navigate = useNavigate(); // Hook for navigation
  const ORDER_TYPE = ["order", "purchase"];
  return (
    <Wrapper>
      <Form method="post">
        <div className="label-top-box">
          <div className="label-box">
            <label htmlFor="order_type" className="label">
              DATE
            </label>
            <input
              className="calendar"
              type="date"
              name="date"
              value={formValues["date"] || ""}
              onChange={handleOtherInputChange}
            />
          </div>

          <div className="label-box">
            <label htmlFor="order_type" className="label">
              ORDER TYPE
            </label>
            <select
              className="label-box-input"
              name="order_type"
              defaultValue={"order"}
              onChange={handleOtherInputChange}
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
              value={formValues["third_party"] || ""}
              onChange={handleOtherInputChange}
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
              value={formValues["comments"] || ""}
              onChange={handleOtherInputChange}
            />
          </div>
        </div>
        <div className="order_table">
          <div className="row top_table_label">
            <label className="label_title">CODIGO</label>
            <label className="label_title description-label">DESCRIPCION</label>
            <label className="label_title">CAJAS</label>
          </div>
          {divs.map((number) => (
            <div key={number} className="row">
              <OrderRow
                type="number"
                name={`codigo-${number}`}
                value={formValues[`codigo-${number}`] || ""}
                onChange={(e) => handleInputChange(number, e)}
              />
              <input
                className="description-box"
                type="text"
                name={`descripcion-${number}`}
                defaultValue={formValues[`descripcion-${number}`] || ""}
              />

              <OrderRow
                type="number"
                name={`cajas-${number}`}
                value={formValues[`cajas-${number}`] || ""}
                onChange={(e) => handleInputChange(number, e)}
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
        <button type="button" className="btn cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </Form>
    </Wrapper>
  );
};

export default AddOrder;
