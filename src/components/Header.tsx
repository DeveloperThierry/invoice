import React from "react";
import {
  OrganizationSwitcher,
  Show,
  SignIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-bold">
              <Link href="/dashboard"></Link>
              Invoices
            </p>
            <span className="text-slate">/</span>
            <Show when="signed-in">
              <span className="-ml-2">
              <OrganizationSwitcher/>
              </span>
            </Show>
          </div>
          <div>
            <Show when="signed-out">
              <SignInButton />
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
