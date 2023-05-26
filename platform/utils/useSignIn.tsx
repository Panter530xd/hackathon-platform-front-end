import { useMutation } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import type { SignInFormData } from "@/components/user-forms/logIn";

export default function useSignIn() {
  const supabase = useSupabaseClient();

  async function signInUser(formData: SignInFormData) {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      throw error;
    }
  }

  return useMutation({
    mutationFn: (formData: SignInFormData) => signInUser(formData),
    onError: (error: AuthError) => {
      toast.error(error.message);
    },
  });
}
