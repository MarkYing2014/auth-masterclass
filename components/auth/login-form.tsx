"use client";

import CardWrapper from "@/components/auth/cardwrapper";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import FormError from "@/components/ui/form-error";
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/ui/form-success";
import { useState } from "react";
import { default_login_redirect } from "@/routes";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");   
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Submitting form with values:", values);
      
      // Validate fields
      const validatedFields = LoginSchema.safeParse(values);
      if (!validatedFields.success) {
        console.log("Validation failed:", validatedFields.error);
        setError("Invalid fields!");
        return;
      }

      // Perform client-side sign-in
      const result = await signIn("credentials", {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        redirect: true,
        callbackUrl: default_login_redirect,
      });
      // The code below this point will not be executed if redirect is true
      if (result?.error) {
        console.error("SignIn error:", result.error);
        setError(result.error);
      } else {
        console.log("Login successful");
        router.push(default_login_redirect); // Redirect to the default login redirect page
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("An unexpected error occurred during form submission");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      showSocial={true}
      backButtonLabel="Don't have an account?"
      backBottonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="john@doe.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <FormSuccess success={success} />

          <Button type="submit" size="lg" className="w-full" disabled={isPending || isLoading}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
