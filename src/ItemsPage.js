import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  logOut,
} from "./features/currentUser/currentUserSlice";
import { selectUsers, editUser } from "./features/users/usersSlice";
import { Container, Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const history = useHistory();

  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);

  useEffect(() => {
    // after render
    const newData = _.toPairs(users).map((user) => {
      return {
        id: user[0],
        name: user[1].name,
        gender: user[1].gender,
        email: user[1].email,
      };
    });
    setRowData([...newData]);
  }, [users]);
  const handleLogout = () => {
    dispatch(logOut());
    history.push("/");
  };

  useEffect(() => {
    gridApi && gridApi.sizeColumnsToFit();
  }, [gridApi]);

  const onGridReady = ({ api, columnApi }) => {
    setGridApi(api);
    // setGridColumnApi(columnApi);
  };

  const onCellValueChanged = (mutatedData) => {
    const {
      data: { id },
      colDef: { field },
      newValue,
    } = mutatedData;
    dispatch(editUser({ newValue, field, id }));
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
      <Menu>
        <Menu.Item>
          <Link to="/">
            <i aria-hidden="true" className="angle left icon"></i>
            Go Back
          </Link>
        </Menu.Item>
        <Menu.Item>Welcome back, {currentUser.first_name}!</Menu.Item>
        <Menu.Item position="right">
          <Button onClick={handleLogout}>Log out</Button>
        </Menu.Item>
      </Menu>

      <Container>
        <div className="ag-theme-alpine" style={{ height: 500, width: "auto" }}>
          <AgGridReact
            rowData={rowData}
            onGridReady={onGridReady}
            onCellValueChanged={(mutatedData) =>
              onCellValueChanged(mutatedData)
            }
          >
            <AgGridColumn field="name" filter resizable editable></AgGridColumn>
            <AgGridColumn
              field="gender"
              filter
              resizable
              editable
            ></AgGridColumn>
            <AgGridColumn
              field="email"
              filter
              resizable
              editable
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </Container>
    </>
  );
};

export default React.memo(ItemsPage);
