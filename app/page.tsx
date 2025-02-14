"use client";
import { columns } from "@/components/SubscriptionColumn/SubscriptionColumn";
import { DataTable } from "@/components/ui/data-table";
import { useFetchCustomerSubscriptions } from "@/hooks/subscription/customer-subscription";
import Image from "next/image";
import { TbLoader2 } from 'react-icons/tb'
import { SignOutButton, useAuth } from "@clerk/nextjs"; 
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Subscription from '@/mongodb/model/Subscriptions';
import { connectDb, disconnectDb } from '@/mongodb/config/dbconfig';

export default function Home() {
  // const {data, isLoading} = useFetchSubscriptions()
  const {data, isLoading} = useFetchCustomerSubscriptions("67ae67c1edeed48863c8f3d6")
  const { isSignedIn, isLoaded } = useAuth(); 


  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     window.location.href = "/sign-in"; 
  //   }
  // }, [isLoaded, isSignedIn]);

if (isLoading) {
  <div className='flex items-center flex-col gap-3 text-purple-500'>
  <TbLoader2 className='w-10 h-10 animate-spin' />
  <p>Loading...</p>
</div>
}

// const getSubscriptions = async () => {
//   "use server"; 

//   try {
//     await connectDb(); 

//     const subscriptions = await Subscription.find({});

//     return subscriptions; 
//   } catch (error) {
//     console.error('Error fetching subscriptions:', error instanceof Error ? error.message : error);
//     throw new Error('Failed to fetch subscriptions');
//   } finally {
//     await disconnectDb(); 
//   }
// };

const calculateStatusCounts = (subscriptions: any) => {
  const counts = {};
  subscriptions.forEach(subscription => {
    const status = subscription.status;
    counts[status] = (counts[status] || 0) + 1;
  });
  return counts;
};

const statusCounts = calculateStatusCounts(data || []);  
console.log()
return (
    <main className="py-20">
      <div className="flex justify-end px-20">
        <div className="bg-black px-6 py-2 rounded-md text-white hover:opacity-75">
        <SignOutButton/>
        </div>
  
      </div>
      
      <div className="flex flex-col mx-20">
      <h1 className="text-lg font-bold capitalize">View all customer subscriptions</h1>
      <div className="mb-4 w-1/3">
          <h2 className="text-md font-semibold">Status Counts</h2>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Status</th>
                <th className="border-b px-4 py-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statusCounts).map(([status, count]) => (
                <tr key={status}>
                  <td className="border-b px-4 py-2">{status}</td>
                  <td className="border-b px-4 py-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <DataTable columns={columns} data={data || []} noDataMessage="No customer subscriptions found" showNameFilter={true}/>
    
      </div>
     
     </main>
  );
}
