"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useEffect } from "react";
import { changeHandling } from "@/app/services/changePasswordApi";
import { changeFormSchema, changeForm } from "@/schema/changePassword.schema";
import { signOut } from "next-auth/react";
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
  error: { currentPassword: [], password: [], rePassword: [] },
  message: null,
};
export default function ChangePassword() {
  const [action, changeAction] = useActionState(changeHandling, formState);
  useEffect(() => {
    let timeOut: NodeJS.Timeout;
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
        timeOut = setTimeout(() => {
          signOut({ callbackUrl: action.callbackUrl || "/login" });
        }, 2000);
      }
    }
    return () => {
     if(timeOut){
       clearTimeout(timeOut);
     }
    };
  }, [action]);

  const form = useForm<changeForm>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changeFormSchema),
  });
  return (
    <section className="py-11 bg-[#DB4444] min-h-screen mx-auto">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-[16px] md:text-3xl xlg:text-5xl text-center">
          Change Password
        </h2>
        <Form {...form}>
          <form action={changeAction} className="space-y-8">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>
                    {action?.error?.currentPassword?.[0]}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
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
                  <FormLabel>RePassword</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="************"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>
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
