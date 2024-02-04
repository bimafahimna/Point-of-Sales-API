import * as yup from "yup";

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  position: yup.string().required("Position is required"),
  address: yup.string().required("Address is required"),
  birthdate: yup.string().required("Birthdate is required"),
  phone: yup.string().required("Phone number is required"),
});

export default registerSchema;
