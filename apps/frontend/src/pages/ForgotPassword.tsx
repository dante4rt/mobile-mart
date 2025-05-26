import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      // TODO: Call forgot password API endpoint here
      console.log(`Sending reset link to: ${data.email}`);
      await new Promise((r) => setTimeout(r, 1200));
      setSuccess("If an account with that email exists, a password reset link has been sent.");
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md shadow-lg bg-background dark:bg-gray-900">
          <CardHeader className="space-y-1 px-6 pt-6">
            <CardTitle className="text-3xl font-semibold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 p-3 rounded-md flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-green-50 p-3 rounded-md flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{success}</p>
                </div>
              )}
              <div>
                <Label htmlFor="email" className="mb-1 block font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full shadow bg-blue-500 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="px-6 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Back to{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 text-sm">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
