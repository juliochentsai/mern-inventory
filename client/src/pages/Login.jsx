import { Form, Link, redirect } from "react-router-dom";
import { FormRow, SubmitButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/LoginPage";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard/all-product");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Login = () => {
  return (
    <Wrapper>
      <div className="login-container">
        <Form method="post" className="form">
          <FormRow
            type="email"
            name="email"
            defaultValue="julio111777@hotmail.com"
          />
          <FormRow type="password" name="password" defaultValue="123456" />
          <SubmitButton />
          <p>
            <span>Do not have an account? </span>

            <Link to="/register" className="member-btn">
              Register
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Login;
