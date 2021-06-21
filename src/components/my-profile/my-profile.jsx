import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { onUpdateUser } from "../../redux/user/user.actions";

// Components
import InputField from "../form/input-field/input-field";
import InputCheckbox from '../form/input-checkbox/input-checkbox';
import FormErrorMessages from "../form/form-error-messages/form-error-messages";

// Styles
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyProfile = () => {
  const dispatch = useDispatch();
  const {
    activeUser,
    activeUser: { email },
  } = useSelector((state) => state.user);

  const {
    username,
    password,
    recipeCategories,
    errors: {
      username: usernameErrors ,
      password:  passwordErrors,
    },
  } = useSelector((state) => state.inputs);

  const onSubmit = (e) => {
      e.preventDefault();
    dispatch(onUpdateUser({ email, username, password, recipeCategories }));
  };
  return (
    <div className="my-profile col-md-5">
      <Form>
        <Row>
          <InputField
            label="Username"
            name="username"
            type="text"
            placeholder="Update username"
            defaultValue={activeUser.username}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={activeUser.password}
            placeholder="Upadate password"
          />

          <Col sm={7} md={12}>
            <InputCheckbox />
          </Col>

          <Col sm={7} md={12}>
            <Button
              onClick={onSubmit}
              type="submit"
              variant="primary"
              size="md"
              block
              disabled={usernameErrors.length || passwordErrors.length}
            >
              Update Details
            </Button>
            {/* {loginError && <FormErrorMessages errors={[loginError]} />} */}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MyProfile;
