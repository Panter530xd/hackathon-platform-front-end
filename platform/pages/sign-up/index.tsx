import LoadingSpiner from "@/components/LoadingSpiner";
import useSignUp from "@/utils/userSignUp";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
export type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useSignUp();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();

        router.push("/dashboard");
      },
    });
  };

  return (
    <div className="bg-admin min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-1 md:w-6/12 w-11/12 mx-auto element2 md:p-20 p-5 rounded-lg shadow-lg border-2"
      >
        <h4 className="text-2xl font-bold text-center text-black">Sign up</h4>
        <label htmlFor="fullName" className="text-black">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName", { required: true, maxLength: 20 })}
          className="bg-white border-2 border-greenis text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.fullName && (
          <span className="text-red-500">Full Name is required</span>
        )}
        <label htmlFor="email" className="text-black">
          Email
        </label>
        <input
          id="email"
          type="text"
          {...register("email", { required: true, maxLength: 20 })}
          className="bg-white border-2 border-greenis text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
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
          className="bg-white border-2 border-greenis text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
        <div className="flex justify-end pt-2">
          <button
            className="bg-greenis text-white font-bold text-base rounded-lg px-5 py-2 uppercase"
            type="submit"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpiner />
                Signing up
              </div>
            ) : (
              <>
                {!isSuccess && "Sign up"}
                {isSuccess && (
                  <div className="flex items-center gap-2">
                    <IconCircleCheck className="h-6 w-6" />
                    Signed up
                  </div>
                )}
              </>
            )}
          </button>
        </div>
        <div className="text-center">
          <span>Have an account? </span>

          <Link href="/admin-login" className="text-primary">
            Sign in!
          </Link>
        </div>
      </form>
    </div>
  );
}
