import React, { useState, useEffect } from "react";
import OtherTab from "./component/Tabs/OtherTab";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  updateCurrentUser,
  logOut,
} from "./features/currentUser/currentUserSlice";
import { selectUsers } from "./features/users/usersSlice";
import { Container, Menu, Button } from "semantic-ui-react";

import UsersTab from "./component/Tabs/UsersTab";

const tabs = {
  usersTab: "USERS_TAB",
  otherTab: "OTHER_TAB",
};

const ItemsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const usersList = useSelector(selectUsers);

  const history = useHistory();
  const [activeTab, setActiveTab] = useState(tabs.usersTab);

  useEffect(() => {
    if (currentUser) {
      const { name, email, first_name, last_name, gender } = usersList[
        currentUser.id
      ];

      dispatch(
        updateCurrentUser({
          id: currentUser.id,
          name,
          email,
          first_name,
          last_name,
          gender,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersList, dispatch]);

  const handleLogout = () => {
    dispatch(logOut());
    history.push("/");
  };

  if (!currentUser) {
    return (
      <>
        <br />
        <br />
        <Container fluid textAlign="center">
          Please login to view contents.
          <br />
          <br />
          <Link to="/">
            <i aria-hidden="true" className="angle left icon"></i>
            Go Back
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <Menu tabular>
        <Menu.Item>Welcome back, {currentUser.name}!</Menu.Item>
        <Menu.Item
          name="Users"
          active={activeTab === tabs.usersTab}
          onClick={() => setActiveTab(tabs.usersTab)}
        />
        <Menu.Item
          name="Others"
          active={activeTab === tabs.otherTab}
          onClick={() => setActiveTab(tabs.otherTab)}
        />
        <Menu.Item position="right">
          <Button onClick={handleLogout}>Log out</Button>
        </Menu.Item>
      </Menu>

      {activeTab === tabs.usersTab && <UsersTab />}
      {activeTab === tabs.otherTab && <OtherTab />}
    </>
  );
};

export default React.memo(ItemsPage);
