import React, { useState, useEffect } from "react";

// Redux
import { onLogin } from "../redux/actions";
import { useDispatch } from "react-redux";
import { validationsAPI } from "../DAL/validations";
import { loginUser } from "../services/API_Services/UserAPI";
import useFetch from "../useFetch";

// Routing
import { useHistory } from "react-router-dom";

// Components
import InputField from "./Forms/InputField";
import CheckCircleSuccess from "./CheckCircleSuccess";
import CustomButton from "./CustomButton";

import "../styles/styles.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

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

    try {
      validationsAPI.email(values.email);
      validationsAPI.password(values.password);
    } catch (e) {
      setErrors({ ...errors, [e.field]: e.message });
      return;
    }

    await sendRequest(loginUser, values);
  };

  useEffect(() => {
    if (data) {
      dispatch(onLogin(data));
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
    return () => {};
  }, [data]);

  return (
    <div className="login">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          errors={errors.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={values.password}
          errors={errors.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : data ? (
          <CheckCircleSuccess message="Welcome. Redirecting..." />
        ) : (
          <CustomButton>Login</CustomButton>
        )}

        <br />

        {error && <small>{error}</small>}
      </form>
    </div>
  );
};
export default Login;
