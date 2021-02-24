import _ from "lodash";

export const validateName = (name) => {
  return new Promise((resolve, reject) => {
    if (name === "") {
      reject({
        field: "name",
        pointing: "below",
        content: "Name cannot be left empty.",
        valid: false,
      });
    }

    const alphabetOnly = /^[a-zA-Z ]*$/;
    if (!alphabetOnly.test(name)) {
      reject({
        field: "name",
        pointing: "below",
        content: "Name must contain only alphabets.",
        valid: false,
      });
    }

    if (name.length < 3) {
      reject({
        field: "name",
        pointing: "below",
        content: "Name must have atleast 3 letters.",
        valid: false,
      });
    }

    if (name.length > 15) {
      reject({
        field: "name",
        pointing: "below",
        content: "Name must be within 15 letters.",
        valid: false,
      });
    }

    resolve({
      field: "name",
      valid: true,
    });
  });
};

export const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (email === "") {
      reject({
        field: "email",
        pointing: "below",
        content: "Email cannot be left empty.",
        valid: false,
      });
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      reject({
        field: "email",
        pointing: "below",
        content: "Invalid email address",
        valid: false,
      });
    }

    resolve({ field: "email", valid: true });
  });
};

export const validatePassword = (password) => {
  return new Promise((resolve, reject) => {
    // Check password length
    if (password !== "" && password.length < 8) {
      reject({
        field: "password",
        pointing: "below",
        content: "Password is too short, must be atleast 8 letters.",
        valid: false,
      });
    } else {
      resolve({ field: "password", valid: true });
    }
  });
};

export const validateUser = (userList, userData) => {
  if (userList) {
    return new Promise((resolve, reject) => {
      const { email, password } = userData;

      _.forIn(userList, (user, id) => {
        if (user.email === email && user.password === password) {
          resolve({
            valid: true,
            id,
            ...user,
          });
          return;
        }
      });

      reject({
        header: "No user found",
        content:
          "With the above combination of email and password, no user exists.",
        valid: false,
      });
    });
  }
};

export const getGender = (gender_code) => {
  switch (gender_code) {
    case "m":
      return "Male";
    case "f":
      return "Female";
    case "o":
      return "Others";
    default:
      break;
  }
};
