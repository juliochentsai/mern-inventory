import { Form, Link, redirect } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration sucessful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <div className="login-container">
        <Form method="post" className="form">
          <FormRow type="name" name="name" defaultValue="Julio" />
          <FormRow
            type="email"
            name="email"
            defaultValue="julio111777@hotmail.com"
          />
          <FormRow type="password" name="password" defaultValue="123456" />
          <FormRow
            type="password"
            name="confirmPassword"
            defaultValue="123456"
          />
          <SubmitButton />
          <p>
            <span>Already have an account? </span>

            <Link to="/login" className="member-btn">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Register;
