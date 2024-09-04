"use client";
import React, { useEffect, useState } from "react";
import { useJobsStore } from "@/store/jobsStore";
import { useGetJobs } from "@/hooks/api/useGetJobs";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading/Loading";
import { useGetJob } from "@/hooks/api/useGetJob";
import JobDetailModal from "@/components/modals/JobDetailModal";
import { useProfileStore } from "@/store/profileStore";
import { usePostJobWithdraw } from "@/hooks/api/usePostJobWithdraw";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination/pagination";

const Jobs = () => {
  const { jobs } = useJobsStore();
  const { user, removeFromAppliedJob } = useProfileStore();
  const getJobsMutation = useGetJobs();
  const getJobMutation = useGetJob();
  const postJobWithdrawMutation = usePostJobWithdraw();
  const router = useRouter();
  const params = useSearchParams();
  const [selectedJobId, setSelectedJobId] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const onWithdrawHandler = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    postJobWithdrawMutation.mutate(id, {
      onSuccess: (data: any) => {
        removeFromAppliedJob(id);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.success(error.message);
      },
    });
  };
  useEffect(() => {
    if (selectedJobId) {
      getJobMutation.mutate(selectedJobId, {
        onSuccess: () => {
          setShowStatus(true);
        },
      });
    }
  }, [selectedJobId]);
  useEffect(() => {
    if (params && params.size > 1) {
      let queryParams: {
        page: string | null;
        perPage: string | null;
      };
      queryParams = {
        page: params.get("page"),
        perPage: params.get("perPage"),
      };
      getJobsMutation.mutate(queryParams);
    } else {
      getJobsMutation.mutate();
    }
  }, [params]);
  useEffect(() => {
    if (getJobsMutation.isError && getJobsMutation.error.message === "Invalid Access Token") {
      router.push("/");
    }
  }, [getJobsMutation.isError, getJobsMutation.error, router]);
  if (getJobsMutation.isPending) {
    return <Loading />;
  } else if (getJobsMutation.isSuccess) {
    return (
      <>
        <div style={{ flex: 5 }}>
          <div className="max-h-[800px] overflow-scroll">
            {jobs?.data.map((job) => {
              return (
                <div
                  key={`jobs-${job.id}`}
                  className="grid grid-cols-12  p-5 border-2 justify-between"
                >
                  <div className="col-span-12 md:col-span-9 md:flex gap-5">
                    <div>
                      <svg
                        className="w-6 h-6 text-gray-80"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z"></path>
                        <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div>Company Name - {job.companyName}</div>
                      <div>{job.description}</div>
                      <div>Location: {job.location}</div>
                      <div>Salary: {job.salary}$</div>
                      <div className="flex gap-4">
                        {job.keywords.map((key, index) => (
                          <button
                            key={`keywords-${index}`}
                            className="border-2 border-black px-2 bg-gray-200"
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 mt-5 items-end flex flex-col">
                    <button
                      className="btn px-8 py-1 rounded-md border-1 bg-black text-white"
                      onClick={() => setSelectedJobId(job.id)}
                    >
                      Detail
                    </button>
                    {user?.appliedJobs.includes(job.id) && (
                      <button
                        type="button"
                        className="mt-2 btn px-8 py-1 rounded-md border-1 bg-white text-black border border-black"
                        onClick={(event) => onWithdrawHandler(job.id, event)}
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination />
        </div>
        {showStatus && (
          <JobDetailModal
            showStatus={showStatus}
            setShowStatus={setShowStatus}
            setSelectedJobId={setSelectedJobId}
          />
        )}
      </>
    );
  }
};

export default Jobs;
