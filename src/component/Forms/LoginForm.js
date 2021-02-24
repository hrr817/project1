import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Segment,
  Button,
  Form,
  Divider,
  Message,
} from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import { logIn } from "../../features/currentUser/currentUserSlice";

import { validateEmail, validatePassword, validateUser } from "../../extras";
const formDataInitialState = {
  email: "",
  password: "",
};

const errorInitialState = {
  email: null,
  password: null,
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(selectUsers);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(formDataInitialState);
  const [isAnyFormFieldEmpty, setIsAnyFormFieldEmpty] = useState(true);

  const [error, setError] = useState(errorInitialState);
  const [loginError, setLoginError] = useState();

  // Handle Errors
  useEffect(() => {
    const { email, password } = formData;
    if (!email.length || !password.length) setIsAnyFormFieldEmpty(true);
    else setIsAnyFormFieldEmpty(false);
  }, [formData]);

  const validateForm = () => {
    return new Promise((resolve, reject) => {
      const { email, password } = formData;

      // Validate email
      const emailPromise = validateEmail(email);
      const passwordPromise = validatePassword(password);

      Promise.all([emailPromise, passwordPromise])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const submitHandler = async () => {
    const { email, password } = formData;

    try {
      const res = await validateForm();
      if (res) {
        setLoading(true);

        const userInputData = {
          email,
          password,
        };

        validateUser(usersList, userInputData)
          .then((res) => {
            if (res.valid) {
              setTimeout(() => {
                setLoading(false);
                dispatch(logIn(res));
                history.push("/itemspage");
              }, 1000);
            }
          })
          .catch((err) => {
            setTimeout(() => {
              setLoading(false);
              setLoginError(err);
            }, 1000);
          });
      }
    } catch (err) {
      console.log(err);
      const { field, content } = err;
      setError((prevErros) => ({
        ...prevErros,
        [field]: content,
      }));
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
        <Form.Input
          label="Email"
          name="email"
          //   value={formData.email.content?.()}
          placeholder="yourname@example.com"
          onChange={(e) => handleFormData(e)}
          error={error.email && error.email}
          fluid
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="********"
          onChange={(e) => handleFormData(e)}
          error={error.password && error.password}
          fluid
        />
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
