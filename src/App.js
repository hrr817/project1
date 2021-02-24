import LoginForm from "./component/Forms/LoginForm";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/currentUser/currentUserSlice";

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Container>
      <br />
      <Header as="h1" textAlign="center">
        Hello World
        <Header.Subheader>Welcome to hello World</Header.Subheader>
      </Header>
      {currentUser ? (
        <Container>
          You are currently logged in.
          <br />
          <Link to="/itemspage">
            Go to items page
            <i aria-hidden="true" className="angle right icon"></i>
          </Link>
        </Container>
      ) : (
        <>
          <LoginForm />
          <Container>
            Don't have an account? <Link to="/signup">Sign up now</Link>
          </Container>
        </>
      )}
    </Container>
  );
}

export default App;
