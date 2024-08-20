import { Form } from "react-router-dom";
import {
  FormRow,
  FormRowSelect,
  WebPreview,
  WebCategorySelector,
  WebIconSelector,
  SubmitButton,
  SelectModal,
} from "../components";
import { CATEGORIA_L0_TYPE, GROUP_CATEGORIES } from "../../../utils/constants";

import Wrapper from "../assets/wrappers/AddWeb";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return null;
};

const AddWeb = () => {
  const [numberOfDivs, setNumberOfDivs] = useState(1);
  const divs = Array.from({ length: numberOfDivs }, (_, index) => index + 1);
  const increaseRows = () => {
    setNumberOfDivs((prevNumber) => {
      const newNumber = prevNumber + 1;
      return newNumber;
    });
  };

  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const limit = 5000; // Increase limit if API allows
      const response = await fetch(`/api/v1/products?limit=${limit}`);
      const data = await response.json();
      setMyProducts(data.products);

      // fetch("/api/v1/products")
      //   .then((response) => response.json())
      //   .then((data) => setMyProducts(data.products))
      //   .catch((error) => toast.error(error?.response.data?.msg));
    };
    fetchProducts();
  }, []);

  const fetchProductField = (codigo, field) => {
    const product = myProducts.find((p) => p.codigo === parseInt(codigo, 10));
    if (field === "descripcion") {
      return product ? product.descripcion : "";
    } else if (field === "_id") {
      return product ? product._id : "";
    } else if (field === "modelo") {
      return product ? product.modelo : "";
    } else if (field === "precio") {
      return product ? product.precio : "";
    } else if (field === "imageUrl") {
      return product ? product.imageUrl : "";
    }
  };

  const [formValues, setFormValues] = useState({
    mainCategory: "",
    subCategory: "",
    item: "",
  });

  console.log(formValues);
  const handleInputChange = (rowIndex, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [`${name}`]: value };
      newValues[`descripcion-${rowIndex}`] = fetchProductField(
        value,
        "descripcion"
      );
      newValues[`id-${rowIndex}`] = fetchProductField(value, "_id");
      newValues[`modelo-${rowIndex}`] = fetchProductField(value, "modelo");
      newValues[`precio-${rowIndex}`] = fetchProductField(value, "precio");
      newValues[`imageUrl-${rowIndex}`] = fetchProductField(value, "imageUrl");
      return newValues;
    });
  };

  const handleOtherInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };

      if (name === "mainCategory") {
        newValues.subCategory = "";
        newValues.item = "";
      } else if (name === "subCategory") {
        newValues.item = "";
      }

      return newValues;
    });
  };

  return (
    <Wrapper>
      <Form method="post">
        <div className="container">
          <div className="container_item">
            <WebCategorySelector
              GROUP_CATEGORIES={GROUP_CATEGORIES}
              formValues={formValues}
              onChange={handleOtherInputChange}
            />

            <label>TITLE</label>
            <input
              type="text"
              name="title"
              required
              onChange={handleOtherInputChange}
            />
            <label>DESCRIPTION</label>
            <textarea
              type="text"
              name="description"
              required
              onChange={handleOtherInputChange}
            />
          </div>
          <div className="table_header">
            <label>CODE</label>
            <label>NAME</label>
            <label>ICON</label>
            <label>IMAGE1</label>
            <label>IMAGE2</label>
            <label>IMAGE3</label>
          </div>
          {divs.map((number) => (
            <div key={number} className="table_row">
              <input
                type="number"
                name={`codigo-${number}`}
                defaultValue={""}
                onChange={(e) => handleInputChange(number, e)}
              />

              <input
                type="text"
                name={`descripcion-${number}`}
                defaultValue={formValues[`descripcion-${number}`] || ""}
                readOnly
              />

              <SelectModal
                imageKey={`image1-${number}`}
                onChange={handleOtherInputChange}
              />
              <SelectModal
                imageKey={`image2-${number}`}
                onChange={handleOtherInputChange}
              />
              <SelectModal
                imageKey={`image3-${number}`}
                onChange={handleOtherInputChange}
              />
              <WebIconSelector
                iconName={`icon-${number}`}
                onChange={handleOtherInputChange}
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

          <SubmitButton />
        </div>
      </Form>
      <WebPreview formValues={formValues} />
    </Wrapper>
  );
};

export default AddWeb;
