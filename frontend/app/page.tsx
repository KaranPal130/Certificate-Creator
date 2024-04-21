"use client";
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
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import nextConfig from '@/next.config.mjs';
import moment from "moment";
import { Loading } from "@/components/shared/loading";
import axios from "axios"
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  recipientName: z
    .string()
    .min(2, {
      message: "Recipient Name must be at least 2 character",
    })
    .max(50, {
      message: "Recipient Name must be lesser then 50 character",
    }),
  courseName: z
    .string()
    .min(2, {
      message: "Course Name must be at least 2 character",
    })
    .max(50, {
      message: "Course Name must be lesser then 50 character",
    }),
  issuerName: z
    .string()
    .min(2, {
      message: "Issuer Name must be at least 2 character",
    })
    .max(50, {
      message: "Issuer Name must be lesser then 50 character",
    }),
  dateOfIssue: z.date(),
});

export default function Home() {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: "",
      courseName: "",
      dateOfIssue: new Date(),
      issuerName: "",
    },
  });

  // if (isLoading) return <Loading />;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { toast } = useToast()
    try{
      const obj = {
        recipientName: values.recipientName,
        courseName: values.courseName,
        issuerName: values.issuerName,
        dateOfIssue: moment(values.dateOfIssue).format('YYYY-MM-DD')
      }
      setIsLoading(true)
      let result = await axios.post(`${nextConfig.API_URL}/create`, obj);
      // if(result) {
      //   toast({
      //     title: "Certificate Created Sucessfully",
      //     description: `${result}`,
      //   })
      // }
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Create Certiicate</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recipient Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="Course Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfIssue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Issue</FormLabel>
                <br />
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        {...field}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Issuer Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

