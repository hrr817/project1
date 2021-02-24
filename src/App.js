import { useEffect } from "react";
import LoginForm from "./component/Forms/LoginForm";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  updateCurrentUser,
} from "./features/currentUser/currentUserSlice";
import { selectUsers } from "./features/users/usersSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const usersList = useSelector(selectUsers);

  useEffect(() => {
    if (currentUser) {
      dispatch(updateCurrentUser({ ...usersList[currentUser.id] }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersList, dispatch]);

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
