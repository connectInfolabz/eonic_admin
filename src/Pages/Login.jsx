import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/user/login`,
        data
      );
      toast.success("Login Succesfully!!", {
        autoClose: 1500,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.log("Login Err: ", error);
      console.log(error.response.data);

      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-lg-12 col-6 mt-5">
            <div id="auth-left">
              <div
                className="auth-logo mb-3 d-flex justify-content-center"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                {/* <img src="./assets/compiled/svg/logo.svg" alt="Logo" /> */}
              </div>
              <h1 className="auth-title mt-5 mb-3 d-flex justify-content-center">
                Admin Login
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="text"
                    className="form-control form-control-xl"
                    placeholder="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    reaquired
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-person" />
                  </div>
                </div>
                <div className="form-group position-relative has-icon-left mb-4">
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    reaquired
                  />
                  <div className="form-control-icon">
                    <i className="bi bi-shield-lock" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-lg shadow-lg mt-3"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
