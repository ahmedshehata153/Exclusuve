"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";

export default function LoginForm() {
  const router = useRouter();
  const LoginFormSchema = z.object({
    email: z.email({ message: "email is required" }),
    password: z
      .string()
      .nonempty({ message: "password is required" })
      .min(6, { message: "password should be 6 letters at least" }),
  });
  type loginFormDec = z.infer<typeof LoginFormSchema>;

  const form = useForm<loginFormDec>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(values: loginFormDec) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.ok) {
        toast.success("login successfully", {
          position: "top-center",
        });
        router.push("/");
      } else {
        toast.error("login faild", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-11 min-h-screen">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-5xl text-center">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormMessage />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <div className="mt-5">
          <Link href="/forgetpassword" className="capitalize text-red-700 ">
            forget password...
          </Link>
        </div>
      </div>
    </section>
  );
}
