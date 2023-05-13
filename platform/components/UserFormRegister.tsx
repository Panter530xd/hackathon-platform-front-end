import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  academy: string;
  group: string;
  participation: string;
  foodPreferences: string;
  foodAllergies: string;
  additionalInfo: string;
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      setServerError("");
      const response = await axios.post("/api/registration", data);
      console.log(response.data);
    } catch (error: AxiosError | any) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && (
          <span className="text-red-500">Phone is required</span>
        )}
        <label htmlFor="academy">Academy</label>
        <input
          type="text"
          id="academy"
          {...register("academy", { required: true })}
        />
        {errors.academy && (
          <span className="text-red-500">Academy is required</span>
        )}
        <label htmlFor="group">Group</label>
        <select id="group" {...register("group", { required: true })}>
          <option value="">--Please choose an option--</option>
          <option value="A">Group A</option>
          <option value="B">Group B</option>
          <option value="C">Group C</option>
        </select>
        {errors.group && (
          <span className="text-red-500">Group is required</span>
        )}
        <label htmlFor="participation">Participation</label>
        <select
          id="participation"
          {...register("participation", { required: true })}
        >
          <option value="">--Please choose an option--</option>
          <option value="live">Live</option>
          <option value="online">Online</option>
        </select>
        {errors.participation && (
          <span className="text-red-500">Participation is required</span>
        )}
        <label htmlFor="food-preferences">Food Preferences</label>
        <input
          type="text"
          id="food-preferences"
          {...register("foodPreferences")}
        />
        <label htmlFor="food-allergies">Food Allergies</label>
        <input type="text" id="food-allergies" {...register("foodAllergies")} />
        <label htmlFor="additional-info">Additional Info</label>
        <textarea id="additional-info" {...register("additionalInfo")} />
        bash Copy code
        {serverError && <span className="text-red-500">{serverError}</span>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
