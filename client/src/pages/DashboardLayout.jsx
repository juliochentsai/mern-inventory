import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, NavBar } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useEffect, useState, createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("users/current-user");
    return data;
  } catch (err) {
    return null;
    // return redirect("/");
  }
};
const DashboardContext = createContext();
const DashboardLayout = () => {
  const [isAuthError, setIsAuthError] = useState(false);
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  // useEffect(() => {
  //   if (!isAuthError) return;
  //   logoutUser();
  // }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        logoutUser,
      }}
    >
      <Wrapper>
        <NavBar />
        <main className="dashboard">
          <BigSideBar />
          <div>
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
