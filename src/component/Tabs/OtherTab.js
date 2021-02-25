import React, { useEffect } from "react";
import {
  Container,
  Header,
  Divider,
  Segment,
  Item,
  Button,
} from "semantic-ui-react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOtherUsers,
  clearError,
  fetchUsersList,
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
      {_.map(list, (user, idx) => {
        return <User key={idx} data={user} />;
      })}
    </Item.Group>
  );
};

const OtherTab = () => {
  const dispatch = useDispatch();
  const { list, error, loading, reachedEnd, pageToLoad } = useSelector(
    selectOtherUsers
  );

  // fetch data initially
  useEffect(() => {
    if (!list.length) {
      dispatch(fetchUsersList(pageToLoad));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // remove error after 1 second
  useEffect(() => {
    let timeout;
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [error, dispatch]);

  return (
    <Container>
      {error && (
        <Container textAlign="center">
          {error.message} <br /> Please try again!
        </Container>
      )}
      <Segment>
        <Header>Other Users</Header>
        <Divider />
        {list.length ? <UserList list={list} /> : "No Users"}
        {loading && (
          <Container textAlign="center">Fetching more users...</Container>
        )}
      </Segment>
      {!reachedEnd && (
        <Container textAlign="center">
          <Button onClick={() => dispatch(fetchUsersList(pageToLoad))}>
            Load more
          </Button>
        </Container>
      )}
      <br />
      {reachedEnd && <Container textAlign="center">No more users.</Container>}
      <br />
      <br />
    </Container>
  );
};

export default React.memo(OtherTab);
