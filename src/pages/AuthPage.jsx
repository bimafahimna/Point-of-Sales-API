import { useState } from "react";
import { Box, Container, Button } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import cashier from "../assets/cashier.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      display={{ base: "flex", lg: "grid" }}
      justifyContent={{ base: "center" }}
      gridTemplateColumns={{ lg: "1fr 1fr" }}
      h="100vh"
    >
      <Box display={{ base: "none", lg: "flex" }} bg="yellow.200" m="0" p="0">
        <img
          src={cashier}
          alt="Image by lifeforstock on Freepik"
          style={{ objectFit: "cover", objectPosition: "55%" }}
        />
      </Box>

      <Box
        w="100%"
        h="100%"
        py="2rem"
        px="4rem"
        display="flex"
        flexDir="column"
        justifyContent="center"
        overflowY="scroll"
      >
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button
          onClick={() => setIsLogin((prev) => !prev)}
          colorScheme="yellow"
          variant="link"
          mt={8}
          w="100%"
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthPage;
