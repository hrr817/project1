import React, { useState, useEffect } from "react";
import {
  Header,
  Segment,
  Button,
  Form,
  Divider,
  Message,
} from "semantic-ui-react";
import _ from "lodash";

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import { logIn } from "../../features/currentUser/currentUserSlice";

import { validateEmail } from "../../extras";
const formDataInitialState = {
  email: "",
  password: "",
};

const errorInitialState = {
  emailError: null,
  passwordError: null,
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(formDataInitialState);
  const [isAnyFormFieldEmpty, setIsAnyFormFieldEmpty] = useState(true);

  const [error, setError] = useState(errorInitialState);
  const [loginError, setLoginError] = useState();

  // Handle Errors
  useEffect(() => {
    const { email, password } = formData;

    // Check if any form field is empty
    if (!email.length || !password.length) setIsAnyFormFieldEmpty(true);
    else setIsAnyFormFieldEmpty(false);

    // Validate email
    if (email !== "" && !validateEmail(email)) {
      setError((prevErrors) => ({
        ...prevErrors,
        emailError: {
          pointing: "below",
          content: "Please enter a valid email address.",
        },
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        emailError: null,
      }));
    }

    // Check password length
    if (password !== "" && password.length < 8) {
      setError((prevErrors) => ({
        ...prevErrors,
        passwordError: {
          pointing: "below",
          content: "Password is too short, must be atleast 8 letters.",
        },
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        passwordError: null,
      }));
    }
  }, [formData]);

  const submitHandler = (e) => {
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    const userInputData = {
      email,
      password,
    };

    validateUser(userInputData)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          dispatch(logIn(res));
          history.push("/itemspage");
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          setLoading(false);
          setLoginError(err);
        }, 1000);
      });
  };

  const validateUser = (data) => {
    if (usersData) {
      return new Promise((resolve, reject) => {
        const { email, password } = data;

        _.forIn(usersData, (user, id) => {
          if (user.email === email && user.password === password) {
            resolve({
              id,
              ...user,
            });
            return;
          }
        });

        reject({
          header: "No user found",
          content:
            "With the above combination of email and password, no user exists.",
        });
      });
    }
  };

  const handleFormData = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Segment>
      <Header as="h1">Login</Header>
      <Divider />
      <Form
        onSubmit={submitHandler}
        loading={loading}
        error={loginError ? true : false}
      >
        <Form.Field>
          <Form.Input
            label="Email"
            name="email"
            //   value={formData.email.content?.()}
            placeholder="yourname@example.com"
            onChange={(e) => handleFormData(e)}
            error={error.emailError && error.emailError}
            fluid
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="********"
            onChange={(e) => handleFormData(e)}
            error={error.passwordError && error.passwordError}
            fluid
          />
        </Form.Field>
        {loginError && (
          <Message
            error
            header={loginError.header}
            content={loginError.content}
          />
        )}
        <Button
          type="submit"
          disabled={
            isAnyFormFieldEmpty || error.emailError || error.passwordError
              ? true
              : false
          }
        >
          Login
        </Button>
      </Form>
    </Segment>
  );
};

export default React.memo(LoginForm);
