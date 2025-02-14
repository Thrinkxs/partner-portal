import React from "react";
import { SignIn } from "@clerk/nextjs";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <SignIn />;
    </div>
  );
};

export default page;
