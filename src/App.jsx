import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddProduct from "./Pages/ProductActivity/AddProduct";
import Login from "./Pages/Login";
import ViewProduct from "./Pages/ProductActivity/ViewProduct";
import Feedback from "./Pages/Feedback";
import ContactUs from "./Pages/ContactUs";
import AddBannner from "./Pages/BannerActivity/AddBannner";
import { useEffect, useState } from "react";
import checkSession from "./auth/authService";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./Pages/ProductActivity/EditProduct";
import EditBanner from "./Pages/BannerActivity/EditBanner";
import ViewBanner from "./Pages/BannerActivity/ViewBanner";
import ViewProductEnquiries from "./Pages/ProductActivity/ViewProductEnquiries";
import AddCategory from "./Pages/CategoryActivity/AddCategory";
import ViewCategory from "./Pages/CategoryActivity/ViewCategory";
import EditCategory from "./Pages/CategoryActivity/EditCategory";
import EditContactDetails from "./Pages/editContactDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  axios.defaults.withCredentials = true;

  //for checking session
  useEffect(() => {
    const authenticateUser = async () => {
      // Call checkSession to determine if user is authenticated
      try {
        const isAuthenticated = await checkSession();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Set loading to false after authentication check
      }
    };
    authenticateUser();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ToastContainer stacked={true} />
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/addProduct"
                element={
                  isAuthenticated ? <AddProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editProduct"
                element={
                  isAuthenticated ? <EditProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewProduct"
                element={
                  isAuthenticated ? <ViewProduct /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewProductEnquiries"
                element={
                  isAuthenticated ? (
                    <ViewProductEnquiries />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/addCategory"
                element={
                  isAuthenticated ? <AddCategory /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewCategory"
                element={
                  isAuthenticated ? <ViewCategory /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editCategory"
                element={
                  isAuthenticated ? <EditCategory /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/feedback"
                element={
                  isAuthenticated ? <Feedback /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/contactUs"
                element={
                  isAuthenticated ? <ContactUs /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editContact"
                element={
                  isAuthenticated ? (
                    <EditContactDetails />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/addBanner"
                element={
                  isAuthenticated ? <AddBannner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/viewBanner"
                element={
                  isAuthenticated ? <ViewBanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/editBanner"
                element={
                  isAuthenticated ? <EditBanner /> : <Navigate to="/login" />
                }
              />
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <h3 className="text-center">Page Not Found</h3>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
