import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "demo@demo.com", password: "12345" },
  });

  const supabase = useSupabaseClient();

  const onSubmit = async (formData: FormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      throw error;
    }

    router.push("/dashboard");

    reset();
  };

  return (
    <div className="bg-admin min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-1 md:w-6/12 w-11/12 mx-auto element2 md:p-20 p-5 rounded-lg shadow-lg border-2"
      >
        <h4 className="text-2xl font-bold text-center text-black">
          Admin log in
        </h4>
        <label htmlFor="username" className="text-black">
          User name
        </label>
        <input
          id="username"
          type="text"
          {...register("email", { required: true, maxLength: 20 })}
          className="bg-white border-2 border-[#0AE47C] text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
        <label htmlFor="password" className="text-black">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true, maxLength: 20 })}
          className="bg-white border-2 border-[#0AE47C] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
        <div className="flex justify-end pt-2">
          <button
            className="bg-[#0AE47C] text-white font-bold text-base rounded-lg px-5 py-2 uppercase"
            type="submit"
          >
            sign in
          </button>
        </div>
      </form>
    </div>
  );
}
