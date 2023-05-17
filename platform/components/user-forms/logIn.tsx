import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  password: string;
}

export default function LogIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
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
          {...register("username", { required: true, maxLength: 20 })}
          className="bg-white border-2 border-[#0AE47C] text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.username && (
          <span className="text-red-500">User name is required</span>
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
