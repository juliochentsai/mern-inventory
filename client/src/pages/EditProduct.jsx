import { Form, redirect, useLoaderData, Link } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/EditForm";
import { useEffect, useState } from "react";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/products/${params.id}`);
    return data;
  } catch (error) {
    return redirect("/dashboard/all-product");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/products/${params.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return redirect("/dashboard/all-product");
  } catch (error) {
    return error;
  }
};

const EditProduct = () => {
  const { product } = useLoaderData();

  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  // Keep a reference to the original image URL
  const [originalImageUrl] = useState(product.imageUrl);

  useEffect(() => {
    // Reset imageUrl if the originalImageUrl changes
    setImageUrl(originalImageUrl);
  }, [originalImageUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <h4>EDIT PRODUCT</h4>
        <div className="container">
          <div className="container_top">
            <FormRow
              type="text"
              name="categoria_l0"
              defaultValue={product.categoria_l0}
            />
            <FormRow
              type="text"
              name="categoria_l1"
              defaultValue={product.categoria_l1}
            />
          </div>
          <FormRow
            type="text"
            name="descripcion"
            defaultValue={product.descripcion}
          />
          <div className="container_body">
            <FormRow
              type="number"
              name="codigo"
              defaultValue={product.codigo}
            />

            <FormRow
              type="text"
              name="codigo1"
              defaultValue={product.codigo1}
            />
            <FormRow
              type="number"
              name="compra"
              defaultValue={product.compra}
            />
            <FormRow
              type="number"
              name="precio"
              defaultValue={product.precio}
            />
            <FormRow type="text" name="modelo" defaultValue={product.modelo} />
            <FormRow type="text" name="color" defaultValue={product.color} />
          </div>
          <div className="img-block">
            <img src={imageUrl} alt="img" className="img" />
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Submit</button>
          <Link to="../all-product">Cancel</Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditProduct;
