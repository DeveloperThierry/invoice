import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col justify-center min-h-screen gap-6 text-center max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoice</h1>
      <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign Up</Link>
        </Button>
      </p>
    </main>
  );
}
