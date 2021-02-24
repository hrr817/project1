import React from "react";
import { Container, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import SignupForm from "./component/Forms/SignupForm";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/currentUser/currentUserSlice";

const SignupPage = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser)
    return (
      <Container>
        <br />
        <Card>
          <Card.Content>
            You are already logged in, {currentUser.first_name}!<br />
            <Link to="/itemspage">Go to Items Page</Link>
          </Card.Content>
        </Card>
      </Container>
    );

  return (
    <Container>
      <br />
      <SignupForm />
    </Container>
  );
};

export default SignupPage;
