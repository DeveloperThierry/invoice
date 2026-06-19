import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateInvoice = () => {
  return (
    <main className="flex flex-col justify-center  h-full gap-6 max-w-5xl mx-12 my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Invoices</h1>
      </div>
      <form className="grid gap-4">
        <div>
          <Label htmlFor="name" className="block font-semibold text-sm mb-2">
            Billing Name
          </Label>
          <Input type="text" id="name" name="name" />
        </div>
        <div>
          <Label htmlFor="email" className="block font-semibold text-sm mb-2">
            Billing Email
          </Label>
          <Input type="text" id="email" name="email" />
        </div>
        <div>
          <Label htmlFor="value" className="block font-semibold text-sm mb-2">
            Value
          </Label>
          <Input type="text" id="value" name="value" />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block font-semibold text-sm mb-2"
          >
            Description
          </Label>
          <Textarea id="description" name="description"></Textarea>
        </div>
        <div>
          <Button className="w-full font-semibold">Submit</Button>
        </div>
      </form>
    </main>
  );
};

export default CreateInvoice;
