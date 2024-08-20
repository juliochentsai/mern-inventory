import { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/AddImage";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Image uploaded successfully");
    return { success: true };
  } catch (error) {
    toast.error(error?.response.data?.msg);
    return { success: false, error: error?.response.data?.msg };
  }
};

const AddImage = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const actionData = useActionData();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setPreviewUrl(null);
        document.getElementById("imageUrlTemp").value = ""; // Clear file input field
        document.getElementById("imageNameTemp").value = ""; // Clear file input field
      } else if (actionData.error) {
        toast.error(actionData.error);
      }
    }
  }, [actionData]);

  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data">
        <label className="imageLabel">IMAGE NAME</label>
        <input type="text" id="imageNameTemp" name="imageName" required />

        <input
          type="file"
          id="imageUrlTemp"
          name="imageUrl"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px" }}
            className="imageView"
          />
        )}
        <SubmitButton />
      </Form>
    </Wrapper>
  );
};

export default AddImage;
