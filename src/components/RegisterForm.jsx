import { useState } from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import registerSchema from "../schemas/registerSchema";
import { register } from "../services/authAPI";

const RegisterForm = () => {
  const [form, setForm] = useState("account");

  const handleFormChange = () => {
    setForm((prev) => (prev === "account" ? "personal" : "account"));
  };

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
    address: "",
    birthdate: "",
    phone: "",
  };

  const handleSubmit = async (values) => {
    const credentials = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      position: values.position,
      address: values.address,
      date_of_birth: values.birthdate,
      handphone: values.phone,
    };

    try {
      const response = await register(credentials);
      console.log(response.data); // Handle successful registration
    } catch (error) {
      console.error(error); // Handle registration error
    }
  };

  const accountForms = [
    {
      id: "username",
      label: "Username",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "password",
    },
  ];

  const personalForms = [
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "position",
      label: "Position",
      type: "text",
    },
    {
      id: "address",
      label: "Address",
      type: "text",
    },
    {
      id: "birthdate",
      label: "Birthdate",
      type: "date",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
    },
  ];

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Grid
              width={{
                base: "100%",
                md: "75%",
                lg: "50%",
              }}
              gap={6}
            >
              <GridItem
                colSpan={1}
                display={form === "personal" ? "none" : "block"}
              >
                {accountForms.map((form) => (
                  <FormControl
                    key={form.id}
                    id={form.id}
                    isInvalid={
                      formik.errors[form.id] && formik.touched[form.id]
                    }
                  >
                    <FormLabel>{form.label}</FormLabel>
                    <Input
                      type={form.type}
                      {...formik.getFieldProps(form.id)}
                    />
                    <FormErrorMessage>
                      {formik.errors[form.id]}
                    </FormErrorMessage>
                  </FormControl>
                ))}
              </GridItem>

              <GridItem
                colSpan={1}
                display={form === "account" ? "none" : "block"}
              >
                {personalForms.map((form) => (
                  <FormControl
                    key={form.id}
                    id={form.id}
                    isInvalid={
                      formik.errors[form.id] && formik.touched[form.id]
                    }
                  >
                    <FormLabel>{form.label}</FormLabel>
                    <Input
                      type={form.type}
                      {...formik.getFieldProps(form.id)}
                    />
                    <FormErrorMessage>
                      {formik.errors[form.id]}
                    </FormErrorMessage>
                  </FormControl>
                ))}
              </GridItem>

              <GridItem display={"flex"} flexDir={"column"}>
                {form === "account" ? (
                  <Button
                    onClick={handleFormChange}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleFormChange}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Back
                  </Button>
                )}
                {form === "personal" && (
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={formik.isSubmitting}
                    type="submit"
                  >
                    Register
                  </Button>
                )}
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
