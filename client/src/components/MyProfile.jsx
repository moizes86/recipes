import React, { useState, useEffect } from "react";

import InputField from "./Forms/InputField";
import CustomButton from "./CustomButton";

import { validationsAPI } from "../DAL/validations";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { onLoading, onUpdateUser } from "../redux/actions";

import useFetch from "../useFetch";

// Routing
import { history, useHistory } from "react-router-dom";
import { getUserById, updateUserDetails } from "../services/API_Services/UserAPI";
import CheckCircleSuccess from "./CheckCircleSuccess";

const MyProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { activeUser } = useSelector((state) => state);
  const { sendRequest, loading, data, error, Spinner } = useFetch();

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
    return () => {};
  }, [activeUser, history]);

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
      validationsAPI.username(values.username);
      validationsAPI.password(values.password);
      validationsAPI.confirmPassword(values.confirmPassword, values.password);

      const {
        // _id: { $oid: id },
        id,
        username,
        password,
        confirmPassword,
      } = values;
      const updateResponse = await sendRequest(updateUserDetails, [id, username, password, confirmPassword]);
      if (updateResponse.status === 200) {
        setUpdateSuccess(true);
        dispatch(onUpdateUser({ ...updateResponse.data }));
      } else {
        setErrors("Something went wrong");
      }
    } catch (e) {
      setErrors({ ...errors, [e.field]: e.message });
    }
  };

  return (
    <div className="my-profile">
      <form onSubmit={handleSubmit} noValidate>
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

        {updateSuccess && <p>Update Success</p>}

        {loading ? (
          <Spinner />
        ) : data ? (
          <CheckCircleSuccess message={data.message} />
        ) : (
          <>
            <CustomButton>Submit</CustomButton>
            <small>{error}</small>
          </>
        )}
      </form>
    </div>
  );
};
export default MyProfile;
