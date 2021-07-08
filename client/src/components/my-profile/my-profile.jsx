import React, { useState, useEffect } from "react";

import InputField from "../form/input-field/input-field";
import InputCheckbox from "../form/input-checkbox/input-checkbox";
import CustomButton from "../custom-button/custom-button";

import { validateData } from "../../DAL/api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLoading, onUpdateUser } from "../../redux/user/user.actions";

// Routing
import { history, useHistory } from "react-router-dom";
import { updateUserDetails } from "../../services/API_Services/UserAPI";

const MyProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { activeUser, loading } = useSelector((state) => state.user);

  const [values, setValues] = useState({
    ...activeUser,
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: null,
  });

  const [updateSuccess, setUpdateSuccess] = useState(false)

  const [diets, setDiets] = useState([]);
  const [dietsSelected, setDietsSelected] = useState([]);

  useEffect(() => {
    if (!activeUser) return history.push("/");
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
    dispatch(onLoading(true));
    debugger;
    const { id, username, password, confirmPassword } = values;
    const updateResponse = await updateUserDetails({ id, username, password, confirmPassword });
    if (updateResponse.status === 200) {
      setUpdateSuccess(true);
    } else {
      setErrors("Something went wrong");
    }
    dispatch(onLoading(false));
  };

  return loading ? (
    "LOADING"
  ) : (
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

    {updateSuccess && <p>Update Success</p>}
      {/* <InputCheckbox
        title="Diets"
        items={diets}
        itemsSelected={dietsSelected}
        handleSelect={handleDietSelect}
      /> */}

      <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>Submit</CustomButton>
    </form>
  );
};
export default MyProfile;
