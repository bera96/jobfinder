import React from "react";
import Jobs from "@/layout/jobs/jobs";
import Profile from "@/layout/profile/profile";

const page = () => {
  return (
    <div className="flex">
      <Jobs />
      <Profile />
    </div>
  );
};

export default page;
