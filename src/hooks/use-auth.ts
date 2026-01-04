'use client'

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.email("Invalid email Address"),
  password: z.string().min(6, "Password must be atleast 6 characterstics"),
});

const signUpSchema = z.object({
  firstName: z.string().min(1, "First Name is Required"),
  lastName: z.string().min(1, "Last Name is Required"),
  email: z.email("Invalid email Address"),
  password: z.string().min(6, "Password must be atleast 6 characterstics"),
});

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

export const useAuth = () => {
  const { signIn, signOut } = useAuthActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: SignInData) => {
    setIsLoading(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        flow: "signIn",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("SignIn Error", error);
      signInForm.setError("password", {
        message: "Invalid Email or Password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    console.log(data)
    setIsLoading(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        flow: "signUp",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log("SignUp Error", error);
      signUpForm.setError("root", {
        message: "Failed to create accout. Email may already exist.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.log("SignOut Error", error);
    }
  };

  return {
    signInForm,
    signUpForm,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    isLoading,
  };
};
