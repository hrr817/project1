import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Divider,
  Segment,
  Item,
  Button,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOtherUsers,
  clearError,
  selectOtherUsersIsError,
  selectOtherUsersIsLoading,
  fetchUsersList,
  selectOtherUserTotalPages,
} from "../../features/otherUsers/otherUsersSlice";

const User = ({ data }) => {
  const { avatar, email, first_name, last_name } = data;
  return (
    <Item>
      <Item.Image size="tiny" src={avatar} />
      <Item.Content verticalAlign="middle">
        <Item.Header>{first_name + " " + last_name}</Item.Header>
        <Item.Meta>Email: {email}</Item.Meta>
      </Item.Content>
    </Item>
  );
};

const UserList = ({ list }) => {
  return (
    <Item.Group divided>
      {list.map((user) => (
        <User key={user.email} data={user} />
      ))}
    </Item.Group>
  );
};

const OtherTab = () => {
  const dispatch = useDispatch();
  const otherUsersList = useSelector(selectOtherUsers);
  const isLoading = useSelector(selectOtherUsersIsLoading);
  const isError = useSelector(selectOtherUsersIsError);
  const totalPages = useSelector(selectOtherUserTotalPages);

  const [pageToLoad, setPageToLoad] = useState(1);

  useEffect(() => {
    dispatch(fetchUsersList(pageToLoad));
  }, [pageToLoad, dispatch]);

  useEffect(() => {
    let timeout;
    if (isError) {
      setTimeout(() => {
        dispatch(clearError());
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isError, dispatch]);

  const loadMore = () =>
    setPageToLoad((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : totalPages
    );

  return (
    <Container>
      {isError && (
        <Container textAlign="center">
          An error has occured while fetching users... <br /> Please try again!
        </Container>
      )}
      <Segment>
        <Header>Other Users</Header>
        <Divider />
        {isLoading ? (
          "Loading..."
        ) : otherUsersList.length ? (
          <UserList list={otherUsersList} />
        ) : (
          "No Users"
        )}
      </Segment>
      <Container textAlign="center">
        <Button onClick={() => loadMore()} disabled={pageToLoad === totalPages}>
          Load more...
        </Button>
      </Container>
      <br />
      {pageToLoad === totalPages && (
        <Container textAlign="center">No more users.</Container>
      )}
      <br />
      <br />
    </Container>
  );
};

export default React.memo(OtherTab);
