/**
 * This module contains the dropdown button functionality
 * that enables a user to edit new products or services.
 */

"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FilePenLine } from "lucide-react";

interface EditCustomerType {
  firstName: string;
  lastName: string;
  phone: string;

}

export default function EditCustomerButton({
  firstName,
  lastName,
  phone
}: EditCustomerType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        <DialogTrigger className="block px-4 py-2 text-sm ">
          <FilePenLine size={20} color="#fcba03" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View customer profile</DialogTitle>
            <DialogDescription>
            <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>First Name:</strong> {firstName}</p>
                  <p><strong>Last Name:</strong> {lastName}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </CardFooter>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
