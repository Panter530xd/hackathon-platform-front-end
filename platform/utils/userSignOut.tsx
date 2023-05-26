import { useMutation } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function useSignOut() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      router.push("/");
      toast.success("You are log out now");
    },
    onError: (error: AuthError) => {
      toast.error(error.message);
    },
  });
}
