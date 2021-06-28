import React, { useState } from "react";


import { validateData, login } from "../../DAL/api";

// Redux
import {onLogin} from '../../redux/user/user.actions';
import {useDispatch} from 'react-redux';

// Routing
import {useHistory} from 'react-router-dom';

// Components
import InputField from "../form/input-field/input-field";
import CustomButton from "../custom-button/custom-button";

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
    const loginResponse = await login({ ...values });
    if (loginResponse.status === true) {
      setLoginError(false);
      dispatch(onLogin(loginResponse.body));
      history.push('/');
    } else {
      setLoginError(loginResponse.message);
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
        label="Password"
        name="password"
        type="password"
        value={values.password}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        errors={errors.password}
      />

      <CustomButton
        disabled={!Object.values(errors).every((el) => el === false)}
      >
        Login
      </CustomButton>

      <br />

      {loginError && <small>{loginError}</small>}
    </form>
  );
};
export default Login;
