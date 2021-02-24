import React, { useState } from "react";
import _ from "lodash";
import AriaModal from "react-aria-modal";
import { Menu, Form, Card, Select, Button } from "semantic-ui-react";
import { editUser, selectUsers } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../../constants";
import { validateEmail, validateName } from "../../extras";

const EditorModal = ({ userData, closeModal }) => {
  const dispatch = useDispatch();
  const usersList = useSelector(selectUsers);

  const {
    colDef: { field },
    data: { id, name, email, gender },
  } = userData;

  const [formData, setFormData] = useState({
    name,
    email,
    gender,
    id,
  });

  const [formError, setFormError] = useState({
    name: null,
    email: null,
  });

  const inputChangeHandler = (e, { name, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const emailAlreadyInUse = (usersList, email) => {
    return new Promise((resolve, reject) => {
      const searchList = _.omit(usersList, id);
      _.forIn(searchList, (user) => {
        if (user.email === formData.email) {
          reject({
            field: "email",
            pointing: "below",
            content: "Email already in use.",
            valid: false,
          });
        }
      });

      resolve({ field: "email", valid: true });
    });
  };

  const validateFormData = () => {
    return new Promise((resolve, reject) => {
      const { email, name } = formData;

      const namePromise = validateName(name);
      const emailPromise = validateEmail(email);
      const emailAlreadyInUsePromise = emailAlreadyInUse(usersList, email);

      Promise.all([namePromise, emailPromise, emailAlreadyInUsePromise])
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const submitHandler = async () => {
    try {
      const res = await validateFormData();
      if (res) {
        dispatch(editUser({ ...formData, id }));
        closeModal();
      }
    } catch (err) {
      const { field, content } = err;
      setFormError((prevErros) => ({
        ...prevErros,
        [field]: content,
      }));
    }
  };

  return (
    <AriaModal titleText={name} initialFocus={"#" + field} verticallyCenter>
      <Card>
        <Card.Content>
          <Menu secondary>
            <Menu.Item header>
              <b>User: </b> {name}
            </Menu.Item>
            <Menu.Item onClick={() => closeModal()} position="right">
              <i aria-hidden="true" className="close icon"></i>
            </Menu.Item>
          </Menu>
        </Card.Content>
        <Card.Content>
          <Form onSubmit={() => submitHandler()}>
            <Form.Input
              label="Name"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              error={formError.name && formError.name}
              onChange={(e, a) => inputChangeHandler(e, a)}
              fluid
            />
            <Form.Input
              label="Email"
              type="text"
              name="email"
              id="email"
              value={formData.email}
              error={formError.email && formError.email}
              onChange={(e, a) => inputChangeHandler(e, a)}
              fluid
            />

            <Form.Input
              control={Select}
              label="Gender"
              options={options}
              placeholder="Gender"
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={(e, a) => inputChangeHandler(e, a)}
              fluid
            />
            <Menu secondary>
              <Menu.Item position="right">
                <Button>Update</Button>
              </Menu.Item>
            </Menu>
          </Form>
        </Card.Content>
      </Card>
    </AriaModal>
  );
};

export default EditorModal;
