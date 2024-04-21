"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  certificateId: z.string(),
});

const VerifyCertificate = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificateId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="m-4"><h1>Create Certiicate</h1></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="certificateId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate ID</FormLabel>
                <FormControl>
                  <Input placeholder="Certificate Id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Verify</Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyCertificate;
