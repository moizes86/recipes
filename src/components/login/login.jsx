import React, { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { onLogin } from "../../redux/user/user.actions";

// Formik Yup
import { useFormik } from "formik";
import * as Yup from "yup";

import InputField from "../form/input-field/input-field";

import DAL from "../../DAL/api";

// Styles
import Form from "react-bootstrap/Form";
import CustomButton from "../custom-button/custom-button";
import MyModal from "../my-modal/my-modal";
import Signup from "../signup/signup";

const Login = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string()
      .required("Required")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/, "Minimus six letters and numbers"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const { res, errorMessage } = DAL.userExists(values);
      if (!res) {
        setLoginError(errorMessage);
      } else {
        dispatch(onLogin(res));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputField
        label="Email"
        value={formik.values.email}
        name="email"
        type="email"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched.email}
        errors={formik.errors.email}
      />

      <InputField
        label="Password"
        value={formik.values.password}
        name="password"
        type="password"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        touched={formik.touched.password}
        errors={formik.errors.password}
      />

      <CustomButton type='submit'>Login</CustomButton>

      <br />

      {loginError && <small>{loginError}</small>}

      <MyModal childComponent={Signup}/>
    </Form>
  );
};
export default Login;
