import React, { useState } from "react";

// Redux
import { onLogin } from "../redux/actions";
import { useDispatch } from "react-redux";

import Cookies from 'js-cookie'

// Routing
import { useHistory } from "react-router-dom";

// Components
import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";
import { loginUser } from "../services/API_Services/UserAPI";

import "../styles/styles.scss";
import { validationsAPI } from "../DAL/validations";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const [loginError, setLoginError] = useState(null);

  const handleBlur = ({ target: { name, value } }) => {
    try {
      const validate = validationsAPI[name];
      validate(value);
      setErrors({ ...errors, [name]: "" });
    } catch (e) {
      setErrors({ ...errors, [e.field]: e.message });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError("");
    try {
      validationsAPI.email(values.email);
      validationsAPI.password(values.password);
      const result = await loginUser(values);
      
      if (!result.data.length) {
        setLoginError("Invalid user or password");
      } else {
        if (loginError) setLoginError("");
        dispatch(onLogin(...result.data));
        history.push("/");
      }
    } catch (e) {
      setErrors({ ...errors, [e.field]: e.message });
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.password}
        />

        <CustomButton>Login</CustomButton>

        <br />

        {loginError && <small>{loginError}</small>}
      </form>
    </div>
  );
};
export default Login;
