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

import loginSchema from "../schemas/loginSchema";
import { login } from "../services/authAPI";

const LoginForm = () => {
  const initialValues = {
    usernameOrEmail: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    let credentials;
    if (values.usernameOrEmail.includes("@")) {
      credentials = {
        email: values.usernameOrEmail,
        password: values.password,
      };
    } else {
      credentials = {
        username: values.usernameOrEmail,
        password: values.password,
      };
    }

    try {
      const response = await login(credentials);
      console.log(response.data); // Handle successful login
    } catch (error) {
      console.error(error); // Handle login error
    }
  };

  return (
    <>
      <Container p="0" display="flex" flexDir="column" gap="1rem" mb="1rem">
        <Text fontSize="lg" fontWeight="semibold">
          Sederhana POS
        </Text>
        <Text fontSize="3xl" fontWeight="semibold">
          Login POS Account
        </Text>
        <Text fontSize="sm" mb={4} color="gray">
          Welcome! Please login to your account to enter the dashboard.
        </Text>
      </Container>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Grid gap={2}>
              <GridItem>
                <FormControl
                  id="usernameOrEmail"
                  isInvalid={
                    formik.errors.usernameOrEmail &&
                    formik.touched.usernameOrEmail
                  }
                >
                  <FormLabel htmlFor="usernameOrEmail">
                    Username or Email
                  </FormLabel>
                  <Input
                    type="text"
                    id="usernameOrEmail"
                    {...formik.getFieldProps("usernameOrEmail")}
                  />
                  <FormErrorMessage>
                    {formik.errors.usernameOrEmail}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl
                  id="password"
                  isInvalid={formik.errors.password && formik.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    {...formik.getFieldProps("password")}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <Button
                  type="submit"
                  colorScheme="yellow"
                  isLoading={formik.isSubmitting}
                  width="100%"
                  mt={4}
                  fontSize="lg"
                >
                  Login
                </Button>
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
