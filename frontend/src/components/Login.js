import React from "react";
import { useState, useMemo } from "react";
import axios from "axios";
import "./login.css";
import img from "../img/login-coal.png";
// const { Button, Divider, notification, Space } = antd;
import { Button, Divider, notification, Space } from "antd";

const Context = React.createContext({
  name: "Default",
});
function LoginUser() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.error({
      message: `Invalid Credentials`,
      description:
        // (<Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>)
        `Please check the enter username and password.`,
      placement,
      duration: 2,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );
  const showNotification = () => {
    // console.log(error.response.status);
    openNotification("bottom");
  };
  const [data, setData] = useState({ userid: "", password: "" });
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.placeholder]: input.value });
    console.log(input.type);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // openNotification("bottom");
    console.log(data);

    try {
      const url = "http://localhost:8080/api/login";
      console.log(data);

      const { data: res } = await axios.post(url, data);
      console.log(res);
      localStorage.setItem("token", res.data);
      localStorage.setItem("Type", res.Type);
      localStorage.setItem("OrganizationName", res.OrganizationName);
      localStorage.setItem("id", res.id);
      // openNotification("top");
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error.response.status);
        if (error.response.status === 401) {
          openNotification("bottom");
          console.log("Incorrect credentials.");
        }
      }
    }
  };
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="login__app">
        <div className="login-wrapper">
          {/* <h1 className="login">LOG IN </h1> */}
          <form onSubmit={handleSubmit}>
            <label>
              <p>UserID</p>
              <input
                type="text"
                value={data.userid}
                onChange={handleChange}
                placeholder="userid"
                required="required"
              />{" "}
            </label>
            <label>
              <p className="label">Password</p>
              <input
                type="password"
                onChange={handleChange}
                value={data.password}
                placeholder="password"
                required="required"
              />
            </label>
            <div>
              <button
                type="submit"
                onClick={() => {
                  console.log("submit clicked");
                  // showNotification();
                  // openNotification("bottom");
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div>
          <img src={img} alt="pic" />
        </div>
      </div>
    </Context.Provider>
  );
}

export default LoginUser;
