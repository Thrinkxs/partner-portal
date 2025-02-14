import { useQuery } from "@tanstack/react-query";
import { type Subscription } from "@/utils/types"; 
const fetchSubscriptions = async () => {
  try {
    const response = await fetch(`/api/get-subscriptions`); 
    if (!response.ok) {
      throw new Error("An error occurred while fetching subscriptions");
    }
    const data: Subscription[] = await response.json();
    console.log("Subscription data is", data)
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
};

export const useFetchSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"], 
    queryFn: () => fetchSubscriptions(),
    retryDelay: 500,
    retry: 3,
  });
};