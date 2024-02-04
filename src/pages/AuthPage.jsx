import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box p={8}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <Button
        onClick={() => setIsLogin((prev) => !prev)}
        colorScheme="blue"
        variant="link"
        mt={4}
      >
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </Button>
    </Box>
  );
};

export default AuthPage;
