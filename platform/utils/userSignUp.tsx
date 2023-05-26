import { useMutation } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import type { SignUpFormData } from "../pages/sign-up";

export default function useSignUp() {
  const supabase = useSupabaseClient();

  async function signUpUser(formData: SignUpFormData) {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    if (error) {
      throw error;
    }
  }

  return useMutation({
    mutationFn: (formData: SignUpFormData) => signUpUser(formData),
    onError: (error: AuthError) => {
      toast.error(error.message);
    },
  });
}
