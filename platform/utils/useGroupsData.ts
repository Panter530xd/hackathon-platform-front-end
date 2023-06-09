import { env } from "@/env.mjs";
import { useQuery } from "@tanstack/react-query";

export type Group = {
  id: number;
  name: string;
  academyId: string;
};

type GroupsOptions = {
  allGroups: Group[];
};

export default function useGroupsData() {
  const { data: groupsQuery = { allGroups: [] } } = useQuery<
    GroupsOptions,
    Error
  >(["groups"], async () => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/groups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch groups");
      }

      const groupsData = await response.json();

      return groupsData;
    } catch (error) {
      console.error("Error fetching groups:", error);
      throw error;
    }
  });

  return groupsQuery;
}
