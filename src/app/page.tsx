import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sql } from "drizzle-orm";
import { db } from "@/db";
export default function Home() {
  return (
    <main className="flex flex-col justify-center min-h-screen gap-6 text-center max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Invoice</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Sign Up</Link>
        </Button>
      </p>
    </main>
  );
}
