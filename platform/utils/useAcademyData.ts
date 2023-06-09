import { useQuery } from "@tanstack/react-query";
import { env } from "../env.mjs";

export type Academy = {
  id: number;
  name: string;
};

type AcademiesOptions = {
  allAcademies: Academy[];
};

export default function useAcademyData() {
  const { data: academiesOptions = { allAcademies: [] } } =
    useQuery<AcademiesOptions>(["academies"], async () => {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/academies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch academies");
      }

      const data = await response.json();
      return data;
    });

  return academiesOptions;
}
