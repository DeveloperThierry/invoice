import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container >
        <div className="flex justify-between items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard"></Link>
            Invoices</p>
          <div>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
