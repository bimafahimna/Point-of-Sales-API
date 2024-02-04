import * as yup from "yup";

const loginSchema = yup.object({
  usernameOrEmail: yup.string().required("Username or email is required"),
  password: yup.string().required("Password is required"),
});

export default loginSchema;
