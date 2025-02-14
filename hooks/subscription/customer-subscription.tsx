import { useQuery } from "@tanstack/react-query";
import { type Subscription } from "@/utils/types"; 
const fetchCustomerSubscriptions = async (id: string) => {
  try {
    const response = await fetch(`/api/get-customer-subscription?referralPartner=${id}`); 
    if (!response.ok) {
      throw new Error("An error occurred while fetching subscriptions");
    }
    const data: Subscription[] = await response.json();
    console.log("Customer Subscription data is", data)
    return data;
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
};

export const useFetchCustomerSubscriptions = (id: string) => {
  return useQuery({
    queryKey: ["customer-subscriptions"], 
    queryFn: () => fetchCustomerSubscriptions(id),
    retryDelay: 500,
    retry: 3,
  });
};