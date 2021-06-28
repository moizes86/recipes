import React, { useState, useEffect } from "react";

import InputField from "../form/input-field/input-field";
import InputCheckbox from "../form/input-checkbox/input-checkbox";
import CustomButton from "../custom-button/custom-button";

import { getDiets, createUser, validateData } from "../../DAL/api";

// Redux
import { useDispatch } from "react-redux";
import { onLogin } from "../../redux/user/user.actions";

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

  useEffect(() => {
    (async () => setDiets(await getDiets()))();
  }, []);

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
    const userCreated = await createUser(values, dietsSelected);
    if (userCreated.status === true) {
      dispatch(onLogin(userCreated.body));
      history.push("/");
    } else {
      setSignupError(userCreated.message);
    }
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
        value={values.username}
        name="username"
        type="text"
        placeholder="Enter username"
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

      <InputCheckbox title='Diets' items={diets} itemsSelected={dietsSelected} handleSelect={handleDietSelect} />

      <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>
        Submit
      </CustomButton>

      <br />

      {signupError && <small>{signupError}</small>}
    </form>
  );
};
export default Signup;
