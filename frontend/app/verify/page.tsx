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
import { Loading } from "@/components/shared/loading";
import { useState } from "react";
import nextConfig from "@/next.config.mjs";
import axios from "axios"
import { set } from "date-fns";

const formSchema = z.object({
  certificateId: z.string(),
});

const VerifyCertificate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [certificate, setCertificate] = useState<any>("")
  const [error, setError] = useState<any>("")
  const [verifiedCertificate, setVerifiedCertificate] = useState<any>({})
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificateId: "",
    },
  });

  if (isLoading) return <Loading />
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const certificateId = values.certificateId
      setIsLoading(true)
      let result = await axios.get(`${nextConfig.API_URL}/verify/${certificateId}`);
      setIsLoading(false)
      console.log(result);
      setError("")
      setCertificate("Certificate verified successfully!")
      setVerifiedCertificate(result.data)

    } catch (err) {
      setIsLoading(false)
      setError("Wrong Certificate Id")
      setCertificate("");
      setVerifiedCertificate({})
      console.log(err)
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="m-4"><h1>Create Certiicate</h1></div>
      <div className="text-green-400 m-b-1">
        {certificate}
      </div>
      <div className="text-red-400 m-b-1">
        {error}
      </div>
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

      <div>
        Here Is your certificate:
        <pre>
          {JSON.stringify(verifiedCertificate, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default VerifyCertificate;
