import React, { useState } from "react";

import { validateData } from "../DAL/api";

// Redux
import { onLogin } from "../redux/actions";
import { useDispatch } from "react-redux";

// Routing
import { useHistory } from "react-router-dom";

// Components
import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";
import { loginUser } from "../services/API_Services/UserAPI";

import "../styles/styles.scss";

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
    const error = validateData(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(values);
    if (!result.data.length) {
      setLoginError("Invalid user or password");
    } else {
      if (loginError) setLoginError("");
      dispatch(onLogin(...result.data));
      history.push("/");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          required={true}
          errors={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          required={true}
          errors={errors.password}
        />

        <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>Login</CustomButton>

        <br />

        {loginError && <small>{loginError}</small>}
      </form>
    </div>
  );
};
export default Login;
