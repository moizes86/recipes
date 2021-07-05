import React, { useState } from "react";


import { validateData } from "../../DAL/api";

// Redux
import {onLogin} from '../../redux/user/user.actions';
import {useDispatch} from 'react-redux';

// Routing
import {useHistory} from 'react-router-dom';

// Components
import InputField from "../form/input-field/input-field";
import CustomButton from "../custom-button/custom-button";
import { loginUser } from "../../services/API_Services/UserAPI";

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
    const loginResponse = await loginUser(values);
    if (loginResponse.status === 200) {
      setLoginError(false);
      dispatch(onLogin(...loginResponse.data));
      history.push('/');
    } else {
      setLoginError('Wrong username or password');
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
