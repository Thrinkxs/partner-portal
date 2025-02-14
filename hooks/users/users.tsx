import { useQuery } from "@tanstack/react-query";
import { type User } from "@/utils/types";

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`/api/get-customers`);
    if (!response.ok) {
      throw new Error("An error occurred while fetching users");
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
};

export default fetchUsers;

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    retryDelay: 500,
    retry: 3,
  });
};
