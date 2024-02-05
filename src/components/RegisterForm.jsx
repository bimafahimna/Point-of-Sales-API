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
  Text,
  Container,
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
      <Container
        m="0"
        p="0"
        display={form === "account" ? "flex" : "none"}
        flexDir="column"
        gap="1rem"
        mb="1rem"
      >
        <Text fontSize="lg" fontWeight="semibold">
          Sederhana POS
        </Text>
        <Text fontSize="3xl" fontWeight="semibold">
          Register POS Account
        </Text>
        <Text fontSize="sm" mb={4} color="gray">
          Welcome! Please register your account.
        </Text>
      </Container>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Grid gap={2} display={form === "personal" ? "none" : "grid"}>
              {accountForms.map((form) => (
                <GridItem>
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
                </GridItem>
              ))}
            </Grid>

            <Grid gap={2} display={form === "account" ? "none" : "grid"}>
              {personalForms.map((form) => (
                <GridItem>
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
                </GridItem>
              ))}
            </Grid>

            <Grid mt={8}>
              <GridItem display="flex" flexDir="column">
                {form === "account" ? (
                  <Button
                    onClick={handleFormChange}
                    colorScheme="yellow"
                    variant="outline"
                    isDisabled={accountForms.some(
                      (form) => formik.values[form.id] === ""
                    )}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleFormChange}
                    colorScheme="yellow"
                    variant="outline"
                  >
                    Back
                  </Button>
                )}
                {form === "personal" && (
                  <Button
                    mt={4}
                    colorScheme="yellow"
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
