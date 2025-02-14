import { Subscription } from "@/utils/types"
import { ColumnDef } from "@tanstack/react-table"
import EditCustomerButton from "../Customer/EditCustomerButton";
export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "user.firstName",
    header: "First name",
  },
  {
    accessorKey: "user.lastName",
    header: "Last name",
  },
  {
    accessorKey: "status",
    header: "Subscription Status",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string); 
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date); 
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex justify-center items-center">
        

          <div className="cursor-pointer mt-[5px]">
            <EditCustomerButton
              firstName={user?.firstName}
              lastName = {user.lastName}
              phone = {user.phoneNumber}
            />
          </div>
        </div>
      );
    },
  },
]