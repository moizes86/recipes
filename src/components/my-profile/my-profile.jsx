import React, { useState, useEffect } from "react";

import InputField from "../form/input-field/input-field";
import InputCheckbox from "../form/input-checkbox/input-checkbox";
import CustomButton from "../custom-button/custom-button";

import { getDiets, updateUser, validateData, getUserDetails } from "../../DAL/api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onUpdateUser } from "../../redux/user/user.actions";

// Routing
import { history, useHistory } from "react-router-dom";

const MyProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { activeUser } = useSelector((state) => state.user);

  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: null,
  });

  const [diets, setDiets] = useState([]);
  const [dietsSelected, setDietsSelected] = useState([]);

  const prepareState = async () => {
    setDiets(await getDiets());
    const {
      user: { username, password, dietsSelected },
      userIndex,
    } = await getUserDetails(activeUser.email);
    setValues({ username, password, confirmPassword: "", userIndex });
    setDietsSelected(dietsSelected);
  };

  useEffect(() => {
    if (!activeUser) return history.push("/");

    prepareState();
  }, [activeUser, history]);

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
    const { email, username } = await updateUser(values, dietsSelected);
    dispatch(onUpdateUser({ email, username }));
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <InputCheckbox
        title="Diets"
        items={diets}
        itemsSelected={dietsSelected}
        handleSelect={handleDietSelect}
      />

      <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>
        Submit
      </CustomButton>
    </form>
  );
};
export default MyProfile;
