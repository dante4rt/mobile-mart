import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { AlertCircle } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      console.log("Updating profile with data:", data);
      setSuccess("Profile updated successfully");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <div className="bg-background dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto bg-background dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <Card className="bg-background dark:bg-gray-900">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="bg-green-50 p-3 rounded-md text-green-600 text-sm">
                      {success}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      disabled
                      value={user?.email}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    />
                    <p className="text-sm text-gray-500">Note: e-mail cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="mt-4 shadow dark:border" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8">
              <Card className="border-red-200 bg-background dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Actions here can't be undone</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="shadow text-white bg-red-500">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
