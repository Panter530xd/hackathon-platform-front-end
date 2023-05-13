import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  academy: string;
  group: string;
  numberOfMonths: string;
  participation: string;
  foodPreferences: string[];
  foodAllergies: string[];
  options?: string[];
}

type Academy = {
  id: number;
  name: string;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [foodPreferences, setFoodPreferences] = useState<string[]>([]);
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);
      setServerError("");
      const response = await axios.post("/api/registration", {
        ...data,
        foodPreferences: foodPreferences,
        foodAllergies: foodAllergies,
      });
      console.log(response.data);
    } catch (error: AxiosError | any) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        const response = await axios.get<Academy[]>(
          "https://b81a-92-55-111-2.ngrok-free.app/api/academies"
        );
        setAcademies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAcademies();
  }, []);

  useEffect(() => {
    if (selectedAcademy) {
      const fetchFoodPreferences = async () => {
        try {
          const response = await axios.get<string[]>(
            `/api/academies/${selectedAcademy.id}/food-preferences`
          );
          setFoodPreferences(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchFoodPreferences();
    }
  }, [selectedAcademy]);

  const handleAcademyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const academyId = Number(event.target.value);
    const academy = academies.find((a) => a.id === academyId) || null;
    setSelectedAcademy(academy);
  };

  const handleFoodPreferenceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFoodPreferences(selectedOptions);
  };

  return (
    <div className="py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 md:w-4/12 w-11/12 mx-auto"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.phone && (
          <span className="text-red-500">Phone is required</span>
        )}
        <label htmlFor="academy">Select Academy:</label>
        <select
          id="academy"
          name="academy"
          onChange={handleAcademyChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          {academies.map((academy) => (
            <option key={academy.id} value={academy.id}>
              {academy.name}
            </option>
          ))}
        </select>

        {selectedAcademy && (
          <div>
            <label htmlFor="options">Select Options:</label>
            <select
              id="options"
              name="options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <label htmlFor="numberOfMonths">
            Number of months that you are involved in the academy
          </label>
          <input
            type="text"
            id="numberOfMonths"
            {...register("numberOfMonths", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div className="flex flex-col space-y-4  ">
          <label
            htmlFor="participation"
            className="text-gray-700 dark:text-white"
          >
            I will participate
          </label>
          <div className="flex justify-between w-8/12 mx-auto">
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="participation"
                {...register("participation")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out accent-white"
              />
              <label
                htmlFor="participation_live"
                className="ml-2 text-gray-700 dark:text-white"
              >
                Live
              </label>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="participation"
                {...register("participation")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out accent-white"
              />
              <label
                htmlFor="participation_online"
                className="ml-2 text-gray-700 dark:text-white"
              >
                Online
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="foodPreferences">Food preferences</label>
          <select
            id="foodPreferences"
            onChange={handleFoodPreferenceChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            {foodPreferences.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="foodAllergies">Food allergies</label>
          <input
            type="text"
            id="foodAllergies"
            {...register("foodAllergies")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <div className="relative inline-flex items-center justify-center">
          <input
            type="checkbox"
            checked
            id="participation"
            {...register("participation")}
            className="form-checkbox h-5 w-5 text-gray-600 dark:text-gray-400 transition duration-150 ease-in-out accent-white"
          />
          <label
            htmlFor="participation_online"
            className="ml-2 text-gray-700 dark:text-white"
          >
            I accept the terms and conditions
          </label>
        </div>
        {serverError && <span className="text-red-500">{serverError}</span>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-white hover:bg-gray-100 text-text-gray-700 px-4 py-2 rounded-lg disabled:bg-gray-400 border-gray-400 border-2 "
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
