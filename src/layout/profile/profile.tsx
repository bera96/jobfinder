"use client";
import Loading from "@/components/loading/Loading";
import { useGetProfile } from "@/hooks/api/useGetProfile";
import { useJobsStore } from "@/store/jobsStore";
import { useProfileStore } from "@/store/profileStore";
import React, { useEffect } from "react";

const Profile = () => {
  const { user } = useProfileStore();
  const { allJobs } = useJobsStore();
  const getProfileMutation = useGetProfile();

  const getUserAppliedJobsDetails = () => {
    const userAppliedJobs = user?.appliedJobs;
    const appliedJobsDetails = allJobs?.data.filter((job) => userAppliedJobs?.includes(job.id));

    return appliedJobsDetails;
  };

  useEffect(() => {
    getProfileMutation.mutate();
  }, []);
  if (getProfileMutation.isPending) {
    return <Loading />;
  } else if (getProfileMutation.isSuccess) {
    return (
      <div style={{ maxHeight: "100vh", overflowY: "auto", width: "auto", flex: 2 }}>
        <div className="flex items-center justify-center mt-3">
          <div className="flex-column items-center  space-y-4">
            <img
              src={user?.profileImage}
              alt="User Profile"
              style={{ margin: "0 auto" }}
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
            <p className="text-center">{user?.email}</p>
            <p className="font-semibold text-md text-center lg:text-xl mt-5 mb-5">Applied Jobs</p>
            <div className="mt-2">
              {getUserAppliedJobsDetails()?.map((job) => (
                <div className="mt-2 border-2 border-black bg-gray-50 rounded-md p-2 min-w-[350px] md:min-w-[130px] xxl:min-w-[350px] min-h-[130px] flex flex-col justify-center">
                  <p className="font-semibold text-center">{job.name}</p>
                  <div className="flex">
                    <p className="font-medium">Company Name:</p>
                    <p className="font-light text-center">{job.companyName}</p>
                  </div>
                  <div className="flex">
                    <p className="font-medium">Location</p>
                    <p className="font-light text-center">{job.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
