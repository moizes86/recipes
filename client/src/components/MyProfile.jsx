import React, { useState, useEffect } from "react";

import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";

import { validateData } from "../DAL/api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLoading, onUpdateUser } from "../redux/actions";

// Routing
import { history, useHistory } from "react-router-dom";
import { updateUserDetails } from "../services/API_Services/UserAPI";

const MyProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { activeUser, loading } = useSelector((state) => state);

  const [values, setValues] = useState({
    ...activeUser,
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    confirmPassword: null,
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(onLoading(true));
    const { id, username, password, confirmPassword } = values;
    const updateResponse = await updateUserDetails({ id, username, password, confirmPassword });
    if (updateResponse.status === 200) {
      setUpdateSuccess(true);
      dispatch(onUpdateUser());
      
    } else {
      setErrors("Something went wrong");
    }
    dispatch(onLoading(false));
  };

  return loading ? (
    "LOADING"
  ) : (
    <div className="my-profile">
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

        <CustomButton disabled={!Object.values(errors).every((el) => el === false)}>Submit</CustomButton>
      </form>
    </div>
  );
};
export default MyProfile;
