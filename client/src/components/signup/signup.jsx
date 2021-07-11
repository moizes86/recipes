import React, { useState, useEffect } from "react";

import InputField from "../form/input-field/input-field";
import InputCheckbox from "../form/input-checkbox/input-checkbox";
import CustomButton from "../custom-button/custom-button";

import { validateData } from "../../DAL/api";

import { createUser } from "../../services/API_Services/UserAPI";

// Redux
import { useDispatch } from "react-redux";
import { onLoading, onLogin } from "../../redux/actions";

// Routing
import { history, useHistory } from "react-router-dom";

import "./signup.scss";

const Signup = () => {
  const history = useHistory();
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

  const [diets, setDiets] = useState([]);
  const [dietsSelected, setDietsSelected] = useState([]);

  // useEffect(() => {
  //   (async () => setDiets(await getDiets()))();
  // }, []);

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

  const handleDietSelect = ({ target: { name, checked } }) => {
    if (checked) {
      setDietsSelected([...dietsSelected, name]);
    } else {
      setDietsSelected(dietsSelected.filter((diet) => diet !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(onLoading(true));

    const response = await createUser({ values, dietsSelected });
    if (response.status === 200) {
      history.push("/");
    } else {
      if (response.data.errno === 1062) setSignupError("User already exists");
      else setSignupError("Well, something went wrong");
    }
    dispatch(onLoading(false));
  };

  return (
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

      <InputCheckbox title="Diets" items={diets} itemsSelected={dietsSelected} handleSelect={handleDietSelect} />

      <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>Submit</CustomButton>

      <br />

      {signupError && <small>{signupError}</small>}
    </form>
  );
};
export default Signup;
