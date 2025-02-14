"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { toast } from "sonner";
import { useState } from "react";
import { CompanySchema } from "@/utils/schema";
import { Axios } from "@/utils/Axios";
import { useQueryClient } from "@tanstack/react-query";
type ServiceFormProps = {
  closeDialog: () => void;
}

const ServiceForm = ({closeDialog}: ServiceFormProps) => {
const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CompanySchema>) => {
    try {
      const response = await Axios.post("/api/company/create-company", values);
      if (response.status !== 200) {
        throw new Error("An error occured");
      }
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      toast("New Company has been created.", {
        style: {
          background: "#008080",
          color: "#FFFFFF",
        
        },
      });
  
      form.reset();
      closeDialog()
    } catch (error) {
      console.error(error);
      
    }
  
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Uber" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 1234567890"
                    {...field}
                    type="tel"
                    // onChange={(e) => field.onChange(Number(e.target.value))}
                   
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
