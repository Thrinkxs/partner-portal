// utils/types.ts

export type Subscription = {
    _id: string; 
    user: {
      firstName: string,
      lastName: string,
      phoneNumber: string
    }; 
    offer?: string; 
    status: 'new' | 'active' | 'canceled' | 'expired'; 
    startDate?: Date; 
    endDate?: Date; 
    duration?: number; 
    location?: string;
    selectedPricingObject?: {
      price: number;
      currency: string;
      plan: string;
    }; 
  };

  export type User = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    referralPartner: string
  }