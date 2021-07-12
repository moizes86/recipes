import React, { useState } from "react";

import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";

import { validateData } from "../DAL/api";

import { createUser } from "../services/API_Services/UserAPI";

// Redux
import { useDispatch } from "react-redux";
import { onLoading } from "../redux/actions";

import "../styles/styles.scss";


const Signup = () => {
  const dispatch = useDispatch();

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

  const [signupError, setSignupError] = useState(null);


  const handleBlur = ({ target: { name, value } }) => {
    let error = "";
    if (name === "confirmPassword") {
      error = validateData(name, value, values.password);
    } else {
      error = validateData(name, value);
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(onLoading(true));

    const response = await createUser({ values });
    if (response.status === 200) {
    } else {
      if (response.data.errno === 1062) setSignupError("User already exists");
      else setSignupError("Well, something went wrong");
    }
    dispatch(onLoading(false));
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h5>Signup</h5>
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
          label="Username"
          name="username"
          type="text"
          value={values.username}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.username}
        />

        <InputField
          label="Password"
          value={values.password}
          name="password"
          type="password"
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.password}
        />

        <InputField
          label="Confirm Password"
          value={values.confirmPassword}
          name="confirmPassword"
          type="password"
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors.confirmPassword}
        />

        <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>Submit</CustomButton>

        <br />

        {signupError && <small>{signupError}</small>}
      </form>
    </div>
  );
};
export default Signup;
