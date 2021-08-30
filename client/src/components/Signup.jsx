import React, { useState, useEffect, useCallback } from "react";

import { validationsAPI } from "../DAL/validations";
import useFetch from "../useFetch";
import { createUser } from "../services/API_Services/UserAPI";
import { useHistory } from "react-router-dom";


import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";
import CheckCircleSuccess from "./CheckCircleSuccess";

import "../styles/styles.scss";

const Signup = () => {
  const history = useHistory();
  const { sendRequest, loading, data, error, Spinner } = useFetch();

  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  });

  const handleBlur = ({ target: { name, value } }) => {
    try {
      const validate = validationsAPI[name];
      validate(value, values.password);
      setErrors({ ...errors, [name]: "" });
    } catch (e) {
      setErrors({ ...errors, [name]: e.message });
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
      validationsAPI.username(values.username);
      validationsAPI.password(values.password);
      validationsAPI.confirmPassword(values.confirmPassword, values.password);
      await sendRequest(createUser, values);
    } catch (e) {
      setErrors({ ...errors, [e.field]: e.message });
    }
  };

  useEffect(() => {
    if(data)
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  }, [data]);

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} noValidate>
        <h5>Signup</h5>
        <InputField
          label="Email"
          name="email"
          type="email"
          errors={errors.email}
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputField
          label="Username"
          name="username"
          type="text"
          value={values.username}
          errors={errors.username}
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

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          errors={errors.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        {loading ? (
          <Spinner />
        ) : data ? (
          <CheckCircleSuccess message="Registration Successful. Redirecting..." />
        ) : (
          <CustomButton>Submit</CustomButton>
        )}

        <br />

        {error && <small>{error}</small>}
      </form>
    </div>
  );
};
export default Signup;
