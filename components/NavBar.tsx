/**
 * Contains the navbar at the top of the page (used in landing page only).
 */
"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ServiceForm from "./ServiceForm/ServiceForm";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:px-4 lg:px-8 bg-white">
      <nav className="hidden md:flex md:flex-row justify-between items-center  ">
        <div className=" cursor-pointer ">
          <Logo />
          {/* <h3 className="text-logo font-bold text-xl ml-5">
            <Link href='/'>
              <span className="text-3xl italic pr-0.5">S</span>upplier connect
            </Link>
          </h3> */}
        </div>

        <div className="py-4">
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger className="bg-button p-2 rounded-md text-white">Create Company</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Company</DialogTitle>
                {/* <DialogDescription> */}
                <ServiceForm closeDialog={() => setOpen(false)}/>
                {/* </DialogDescription> */}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
      <nav className="block bg-white md:hidden">
        <Sheet>
          <Logo />
          <SheetTrigger>
            <Menu size={35} className=" absolute top-7 right-6 md:hidden" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mx-auto">
                <Logo />
              </SheetTitle>
              <SheetDescription>
                <SheetClose>
                  <div className="md:flex md:flex-row md:justify-center md:items-center">
                    <div className="p-4">
                      <Button>Create Company</Button>
                    </div>
                  </div>
                </SheetClose>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default NavBar;
