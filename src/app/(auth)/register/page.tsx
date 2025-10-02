"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerForm } from "@/schema/register.schema";
import { registerFormSchema } from "@/schema/register.schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { registerHandling } from "@/app/services/register";
import { useActionState } from "react";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formState = {
  success: false,
  error: {
    name: [],
    email: [],
    password: [],
    rePassword: [],
    phone: [],
  },
  message: null,
};

export default function RegisterForm() {
  const [action, formAction] = useActionState(registerHandling, formState);
  const router = useRouter();
  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        });
      }
      if (action.success && action.message) {
        toast.success(action.message, {
          position: "top-center",
        });
        router.push("/login");
      }
    }
  }, [action,router]);

  const form = useForm<registerForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerFormSchema),
  });
  return (
    <section className="py-11">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-5xl text-center">Sign up</h2>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ahmed abdeldayem"
                      {...field}
                      type="name"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      {...field}
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      {...field}
                      type="Password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
