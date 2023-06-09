import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

type FoodAllergy = {
  id: number;
  name: string;
};

type FoodAllergiesOptions = {
  allFoodsAllergies: FoodAllergy[];
};

export default function useFoodAllergiesData() {
  const { data: foodsAllergiesQuery = { allFoodsAllergies: [] } } =
    useQuery<FoodAllergiesOptions>(["food_allergies"], async () => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/api/food_allergies`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch academies");
      }

      const FoodData = await response.json();
      return FoodData;
    });

  return foodsAllergiesQuery;
}
