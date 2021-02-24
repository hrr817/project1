import React, { useState } from "react";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Segment,
  Form,
  Message,
  Header,
  Divider,
  Button,
  Select,
} from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUsers } from "../../features/users/usersSlice";
import { logIn } from "../../features/currentUser/currentUserSlice";
// import { validateEmail } from "../../extras";

const SignupForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const [errorExistingUser, setErrorExistingUser] = useState(null);

  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
  });

  // for gender
  const options = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Other", value: "Other" },
  ];

  const handleCreation = (data) => {
    return new Promise((resolve, reject) => {
      let exist;

      _.forIn(users, (user) => {
        if (user.email === data.email) {
          exist = true;
          reject({
            header: "Email ID already registered.",
            msg:
              "The email given is already registered. Try using another email.",
          });
        }
      });

      if (!exist) {
        dispatch(createUser(data));
        resolve(true);
      }
    });
  };

  const submitHandler = () => {
    setLoading(true);
    handleCreation({
      ...formData,
      name: formData.first_name + " " + formData.last_name,
    })
      .then(() => {
        setTimeout(() => {
          setSignupComplete(true);
          setLoading(false);
          // login user
          const { email, gender, first_name, last_name } = formData;
          dispatch(logIn({ email, gender, first_name, last_name }));
          history.push("/itemspage");
        }, 1000);
      })
      .catch((err) => {
        setErrorExistingUser(err);
        setSignupComplete(false);
        setLoading(false);
      });
  };

  const onChangeHandler = (e, { name, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (signupComplete) {
    return (
      <Segment>
        <Header as="h1">Thank you for signing up!</Header>
        <Container>You will be logged in shortly...</Container>
      </Segment>
    );
  }

  return (
    <>
      <Container>
        Already have an account? <Link to="/">Login here</Link>
      </Container>
      <Segment>
        <Header as="h1">Sign Up</Header>
        {signupComplete && "Created"}
        <Divider />
        {errorExistingUser && (
          <Message
            error
            header={errorExistingUser.header}
            content={errorExistingUser.msg}
          />
        )}
        {/* Sign Up Form */}
        <Form onSubmit={submitHandler} loading={loading}>
          {/* First Name */}
          <Form.Input
            label="First Name"
            name="first_name"
            placeholder="John"
            onChange={(e, a) => onChangeHandler(e, a)}
            value={formData.first_name}
            fluid
            required
          />

          {/* Last Name */}
          <Form.Input
            label="Last Name"
            name="last_name"
            placeholder="Doe"
            onChange={(e, a) => onChangeHandler(e, a)}
            value={formData.last_name}
            fluid
            required
          />

          {/* Gender */}
          <Form.Input
            control={Select}
            label="Gender"
            options={options}
            placeholder="Gender"
            name="gender"
            onChange={(e, a) => onChangeHandler(e, a)}
            value={formData.gender}
            fluid
            required
          />

          {/* Email */}
          <Form.Input
            label="Email"
            name="email"
            type="email"
            placeholder="yourname@example.com"
            onChange={(e, a) => onChangeHandler(e, a)}
            value={formData.email}
            error={errorExistingUser ? true : false}
            fluid
            required
          />

          {/* Password */}
          <Form.Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            onChange={(e, a) => onChangeHandler(e, a)}
            value={formData.password}
            fluid
            required
          />

          {/* Submit Button */}
          <Button type="submit">Sign up</Button>
        </Form>
      </Segment>
    </>
  );
};

export default React.memo(SignupForm);
