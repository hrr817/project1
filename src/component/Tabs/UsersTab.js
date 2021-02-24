import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";
import { selectUsers } from "../../features/users/usersSlice";
// import { editUser } from "./features/users/usersSlice";
import { Container } from "semantic-ui-react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import EditorModal from "../Modals/EditorModal";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const UsersTab = () => {
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [gridApi, setGridApi] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

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

  useEffect(() => {
    gridApi && gridApi.sizeColumnsToFit();
  }, [gridApi]);

  const onGridReady = ({ api, columnApi }) => {
    setGridApi(api);
    // setGridColumnApi(columnApi);
  };

  // const onCellValueChanged = (mutatedData) => {
  //   const {
  //     data: { id },
  //     colDef: { field },
  //     newValue,
  //   } = mutatedData;
  //   dispatch(editUser({ [field]: newValue, id }));
  // };

  const openModal = (data) => {
    setSelectedUserData(data);
    setShowModal(true);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedUserData(null);
  }, [setShowModal]);

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
      {showModal && (
        <EditorModal userData={selectedUserData} closeModal={closeModal} />
      )}

      <Container>
        <div className="ag-theme-alpine" style={{ height: 500, width: "auto" }}>
          <AgGridReact
            rowData={rowData}
            onGridReady={onGridReady}
            // onCellValueChanged={(mutatedData) =>
            //   onCellValueChanged(mutatedData)
            // }
          >
            <AgGridColumn
              field="name"
              onCellClicked={(data) => openModal(data)}
              filter
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="gender"
              onCellClicked={(data) => openModal(data)}
              filter
              resizable
            ></AgGridColumn>
            <AgGridColumn
              field="email"
              onCellClicked={(data) => openModal(data)}
              filter
              resizable
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </Container>
    </>
  );
};

export default UsersTab;
