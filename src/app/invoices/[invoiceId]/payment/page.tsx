import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq, and, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
// import InvoiceNotFound from "../not-found";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction, deleteInvoiceAction, createPayment } from "@/app/actions";
import { Check, ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const Payment = async ({ params }: { params: { invoiceId: string } }) => {
  const { invoiceId } = await params;
  if (isNaN(parseInt(invoiceId))) {
    throw new Error("Invalid invoice id");
    // return <InvoiceNotFound />;
  }
  const [result] = await db
    .select({
      id: Invoices.id,
      status: Invoices.status,
      createTs: Invoices.createTs,
      description: Invoices.description,
      value: Invoices.value,
      name: Customers.name,
    })
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(eq(Invoices.id, parseInt(invoiceId)))
    .limit(1);

  if (!result) {
    notFound();
    // return(<InvoiceNotFound/>)
  }

  const invoice = {
    ...result,
    customer: {
      name: result.name,
    },
  };
  return (
    <main className="w-full h-full gap-6">
      <Container>
        <div className="grid grid-cols-2">
          <div className="">
            <div className="flex justify-between mb-8">
              <h1 className="flex items-center gap-4 text-3xl font-semibold">
                Invoice {invoiceId}
                <Badge
                  className={cn(
                    "rounded-full capitalize",
                    invoice.status === "open" && "bg-blue-500",
                    invoice.status === "paid" && "bg-green-600",
                    invoice.status === "void" && "bg-zinc-700",
                    invoice.status === "uncollectible" && "bg-red-600"
                  )}
                >
                  {invoice.status}
                </Badge>
              </h1>
              
            </div>
            <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>
            <p className="text-lg mb-8">{invoice.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>
            {invoice.status === 'open' ? (
            <form action={createPayment}>
              <input type="hidden" name="id" value={invoice.id}/>
                <Button className="flex gap-2 font-bold bg-green-700">
                <CreditCard className="w-5 h-auto"/>
                    Pay Invoice
                </Button>
            </form>
            ): (
                <p className="flex gap-2 items-center text-xl font-bold">
                    <Check className="w-8 h-auto bg-green-500 rounded-full text-white p-1"/>
                    Invoice Paid</p>
            )}
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <p>{new Date(invoice.createTs).toLocaleDateString()}</p>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <p>{invoice.customer.name}</p>
          </li>
        </ul>
      </Container>
    </main>
  );
};

export default Payment;
