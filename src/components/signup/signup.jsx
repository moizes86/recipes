import React, { useState } from "react";
import axios from 'axios';
// Formik Yup
import { useFormik, FormikProvider, Field } from "formik";
import * as Yup from "yup";

import InputField from "../form/input-field/input-field";
import InputCheckbox from "../form/input-checkbox/input-checkbox";
import CustomButton from "../custom-button/custom-button";

import DAL from "../../DAL/api";

// Redux
import { useDispatch } from "react-redux";
import { onSetUser } from "../../redux/user/user.actions";

// Styles
import Form from "react-bootstrap/Form";

import "./signup.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const [signupError, setSignupError] = useState(null);

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string()
      .min(5, "At least 5 characters")
      .max(30, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/, "Minimus six letters and numbers"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      categories: [],
      toggle: false,
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      axios.post("http://localhost:3002/signup", {values});
      // axios.post("http://localhost:3002/create", {values}).then(()=>console.log('success'))
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <InputField
          label="Enter Email"
          value={formik.values.email}
          name="email"
          type="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched.email}
          errors={formik.errors.email}
        />

        <InputField
          label="Username"
          value={formik.values.username}
          name="username"
          type="text"
          placeholder="Enter username"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched.username}
          errors={formik.errors.username}
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

        <InputField
          label="Confirm Password"
          value={formik.values.confirmPassword}
          name="confirmPassword"
          type="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          touched={formik.touched.confirmPassword}
          errors={formik.errors.confirmPassword}
        />

        {/* <InputCheckbox categoriesChecked={formik.values.categories}/> */}

        <CustomButton handleClick={formik.handleSubmit}>Submit</CustomButton>

        <br />

        {signupError && <small>{signupError}</small>}
      </Form>
    </FormikProvider>
  );
};
export default Signup;
