import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq, and, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import InvoiceNotFound from "./not-found";
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
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { ChevronDown, CreditCard, Ellipsis, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
const Invoice = async ({ params }: { params: { invoiceId: string } }) => {
  const { userId, orgId } = await auth();
  if (!userId) return;
  const { invoiceId } = await params;
  if (isNaN(parseInt(invoiceId))) {
    // throw new Error("Invalid invoice id");
    return <InvoiceNotFound />;
  }
  
  let result;
  if (orgId){
    [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(eq(Invoices.id, parseInt(invoiceId)), eq(Invoices.organizationId, orgId))
    )
    .limit(1);
  }else{
    [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(eq(Invoices.id, parseInt(invoiceId)), eq(Invoices.userId, userId), isNull(Invoices.organizationId))
    )
    .limit(1);
  }

  if (!result) {
    notFound();
    // return(<InvoiceNotFound/>)
  }

  const invoice = {
    ...result.invoices,
    customer:result.customers
  }
  return (
    <main className="w-full h-full gap-6">
      <Container>
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
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Change Status
                  <ChevronDown className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id} asChild>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <input type="hidden" name="status" value={status.id} />
                        <button>{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span className="sr-only">More Options</span>
                    <Ellipsis className="w-4 h-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2">
                        <Trash2 className="w-4 h-auto" /> Delete Invoice
                      </button>
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/invoices/${invoice.id}/payment`}>
                    <CreditCard/>
                      <button className="flex items-center gap-2">
                      Payment
                      </button>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="bg-white">
                <DialogHeader className="gap-2">
                  <DialogTitle className="text-2xl">Delete Invoice?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your invoice from our servers.
                  </DialogDescription>
                  <DialogFooter>
                    <form action={deleteInvoiceAction} className="flex justify-center itms-center text-center">
                      <input type="hidden" name="id" value={invoiceId} />
                      <Button variant="destructive" className="flex items-center gap-2">
                        <Trash2 className="w-4 h-auto" /> Delete Invoice
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8">{invoice.description}</p>
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
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <p>{invoice.customer.email}</p>
          </li>
        </ul>
      </Container>
    </main>
  );
};

export default Invoice;
