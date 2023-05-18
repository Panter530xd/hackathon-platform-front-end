import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

interface FormValues {
  name: string;
  lastname: string;
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
    <div className="py-8 bg-user font-exoFont">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 md:w-6/12 w-11/12 mx-auto element md:p-20 p-5 rounded-lg shadow-lg"
      >
        <label htmlFor="name" className="text-white font-bold">
          First name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.name && (
          <span className="text-red-700 font-bold">Name is required</span>
        )}
        <label htmlFor="lastname" className="text-white font-bold">
          Last name
        </label>
        <input
          type="text"
          id="lastname"
          {...register("lastname", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.lastname && (
          <span className="text-red-700 font-bold">Last name is required</span>
        )}
        <label htmlFor="email" className="text-white font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.email && (
          <span className="text-red-700 font-bold">Email is required</span>
        )}
        <label htmlFor="phone" className="text-white font-bold">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        />
        {errors.phone && (
          <span className="text-red-700 font-bold">Phone is required</span>
        )}
        <label htmlFor="academy" className="text-white font-bold">
          Select Academy:
        </label>
        <select
          id="academy"
          name="academy"
          onChange={handleAcademyChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
        >
          {academies.map((academy) => (
            <option key={academy.id} value={academy.id}>
              {academy.name}
            </option>
          ))}
        </select>

        {selectedAcademy && (
          <div>
            <label htmlFor="options" className="text-white font-bold">
              Group
            </label>
            <select
              id="options"
              name="options"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
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
          <label htmlFor="numberOfMonths" className="text-white font-bold">
            Number of months that you are involved in the academy
          </label>
          <input
            type="text"
            id="numberOfMonths"
            {...register("numberOfMonths", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          />
        </div>
        <div className="flex flex-col space-y-4  ">
          <label htmlFor="participation" className="text-white font-bold">
            I will participate
          </label>
          <div className="flex w-8/12 mx-auto space-x-2">
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="participation"
                {...register("participation")}
                className="form-checkbox w-8 h-8 text-gray-600  transition duration-150 ease-in-out accent-white"
              />
              <label
                htmlFor="participation_live"
                className="ml-2 text-white font-bold"
              >
                Live
              </label>
            </div>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="participation"
                {...register("participation")}
                className="form-checkbox w-8 h-8 text-gray-600  transition duration-150 ease-in-out accent-white"
              />
              <label
                htmlFor="participation_online"
                className="ml-2 text-white font-bold "
              >
                Online
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="foodPreferences" className="text-white font-bold">
            Food preferences
          </label>
          <select
            id="foodPreferences"
            onChange={handleFoodPreferenceChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  "
          >
            {foodPreferences.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="foodAllergies" className="text-white font-bold">
            Food allergies
          </label>
          <input
            type="text"
            id="foodAllergies"
            {...register("foodAllergies")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          />
        </div>

        <div className="relative inline-flex items-center justify-center">
          <input
            type="checkbox"
            checked
            id="participation"
            {...register("participation")}
            className="form-checkbox h-5 w-5 text-gray-600  transition duration-150 ease-in-out accent-white"
          />
          <label
            htmlFor="participation_online"
            className="ml-2 font-bold  text-white"
          >
            I accept the terms and conditions
          </label>
        </div>
        {serverError && <span className="text-red-700">{serverError}</span>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-greenis border-2 border-white  text-white font-exoFont font-semibold px-4 py-2 rounded-lg disabled:bg-gray-400 w-2/6 mx-auto"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
