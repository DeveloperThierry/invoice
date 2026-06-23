import Container from "@/components/Container";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <Container className="flex justify-center">
      <SignIn />
    </Container>
  );
};

export default SignInPage;
