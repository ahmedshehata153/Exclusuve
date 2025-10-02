"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgetForm } from "@/schema/forget.shema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useEffect } from "react";
import { forgetFormSchema } from "@/schema/forget.shema";
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
    email: [],
  },
  message: null,
};
import { forgetHandling } from "@/app/services/forgetPasswordApi";
export default function ForgetPasswordForm() {
  const [action, forgetAction] = useActionState(forgetHandling, formState);
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
        router.push(action.callbackUrl || "/resetcode");
      }
    }
  }, [action,router]);

  const form = useForm<forgetForm>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetFormSchema),
  });
  return (
    <section className="py-11">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-5xl text-center">
          Forget Password
        </h2>
        <Form {...form}>
          <form action={forgetAction} className="space-y-8">
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
