import React from "react";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import img from "../img/login-coal.png";
function LoginUser() {
  const [data, setData] = useState({ userid: "", password: "" });
  // eslint-disable-next-line
  const [error, setError] = useState(""); 
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.placeholder]: input.value });
    console.log(input.type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
  };
  return (
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
            <button className="login__submit" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <img srcset={img} alt="pic" />
      </div>
    </div>
  );
}

export default LoginUser;
