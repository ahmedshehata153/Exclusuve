"use client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { useEffect } from "react";
import { resetCodeSchema, resetCodeForm } from "@/schema/resetCode.schema";
import { resetCodeHandling } from "@/app/services/resetCodeApi";
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
    resetCode: [],
  },
  message: null,
};
export default function RsestCodeForm() {
  const [action, resetCodeAction] = useActionState(
    resetCodeHandling,
    formState
  );
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
        router.push(action.callbackUrl || "/resetpassword");
      }
    }
  }, [action]);

  const form = useForm<resetCodeForm>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(resetCodeSchema),
  });
  return (
    <section className="py-11">
      <div className="container px-2 md:px-0 mx-auto w-full md:w-1/2">
        <h2 className="font-bold mb-24 text-5xl text-center">Reset Code</h2>
        <Form {...form}>
          <form action={resetCodeAction} className="space-y-8">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@gmail.com"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.resetCode?.[0]}</FormMessage>
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
