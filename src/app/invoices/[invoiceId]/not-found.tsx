import Link from "next/link";

export default function InvoiceNotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center my-12">
      <h1 className="text-4xl font-bold text-zinc-900">404</h1>
      <h2 className="text-xl font-semibold text-zinc-700">Invoice Not Found</h2>
      <p className="text-zinc-500 max-w-sm">
        We couldn't find an invoice with that ID. It may have been deleted or the ID might be incorrect.
      </p>
      <Link 
        href="/dashboard" 
        className="mt-2 px-4 py-2 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 text-sm font-medium transition-colors"
      >
        Back to Invoices
      </Link>
    </main>
  );
}