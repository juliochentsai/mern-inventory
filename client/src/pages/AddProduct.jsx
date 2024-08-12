import { Form } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { CATEGORIA_L0_TYPE } from "../../../utils/constants";
import SubmitBtn from "../components/SubmitButton";
import Wrapper from "../assets/wrappers/AddJob";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return null;
  } catch (error) {
    toast.error(error?.response.data?.msg);
    return error;
  }
};

const AddProduct = () => {
  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <div className="container">
          <div className="container_item top">
            <FormRowSelect
              name="categoria_l0"
              list={Object.values(CATEGORIA_L0_TYPE)}
            />
            <FormRow type="text" name="categoria_l1" required />
          </div>
          <div className="container_item body">
            <FormRow type="text" name="descripcion" required />
            <FormRow type="number" name="codigo" required />
            <FormRow type="text" name="codigo1" required />
          </div>
          <div className="container_item ref">
            <FormRow type="number" name="compra" />
            <FormRow type="number" name="precio" />
            <FormRow type="text" name="modelo" />
            <FormRow type="text" name="color" />
          </div>

          <input type="file" id="imageUrl" name="imageUrl" accept="image/*" />
          <SubmitBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddProduct;
