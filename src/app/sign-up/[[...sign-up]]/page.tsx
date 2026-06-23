import Container from "@/components/Container";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <Container className="flex justify-center">
      <SignUp />
    </Container>
  );
};

export default SignUpPage;
