import { useQuery } from "@tanstack/react-query";
import { env } from "../env.mjs";

export type FoodAllergies = {
  id: number;
  name: string;
};

type FoodOptions = {
  allFoodsAllergies: FoodAllergies[];
};

export default function useFoodAllergiesData() {
  const { data: foodsAllergiesQuery = { allFoodsAllergies: [] } } =
    useQuery<FoodOptions>(["foodAllergies"], async () => {
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

      const data = await response.json();
      return data;
    });

  return foodsAllergiesQuery;
}
