import { usePostJobApply } from "@/hooks/api/usePostJobApply";
import { useJobsStore } from "@/store/jobsStore";
import { useProfileStore } from "@/store/profileStore";
import React from "react";
import { toast } from "react-toastify";

type JobDetailModal = {
  showStatus: boolean;
  setShowStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedJobId: React.Dispatch<React.SetStateAction<string>>;
};

const JobDetailModal = ({ showStatus, setShowStatus, setSelectedJobId }: JobDetailModal) => {
  const { job } = useJobsStore();
  const { user, addAppliedJob } = useProfileStore();
  const usePostApplyJobMutation = usePostJobApply();
  const onApplyHandler = () => {
    if (job && job.id) {
      usePostApplyJobMutation.mutate(job.id, {
        onSuccess: (data: any) => {
          addAppliedJob(job.id);
          toast.success(data.message);
          setShowStatus(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };
  const onModalClose = () => {
    setSelectedJobId("");
    setShowStatus(false);
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal={showStatus}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="mt-2">
              <div className="flex flex-row-reverse">
                <div className="mr-4 cursor-pointer" onClick={() => onModalClose()}>
                  X
                </div>
              </div>
            </div>
            <div className="bg-white px-4 pb-4 pt-1 sm:p-6 sm:pb-4">
              <div className="sm:flex justify-center">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="font-semibold text-center leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Apply Job
                  </h3>
                </div>
              </div>
              <div className="mt-2 flex flex-row">
                <p className="text-sm font-medium">Company Name: </p>
                <p className="text-sm font-light">{job?.companyName}</p>
              </div>
              <div className="mt-2 flex flex-row">
                <p className="text-sm font-medium">Job Name: </p>
                <p className="text-sm font-light">{job?.name}</p>
              </div>
              <div className="mt-2 flex flex-row">
                <p className="text-sm font-medium">Created At: </p>
                <p className="text-sm font-light">{job?.createdAt}</p>
              </div>
              <div className="mt-2 flex flex-row">
                <p className="text-sm font-medium">Location: </p>
                <p className="text-sm font-light">{job?.location}</p>
              </div>
              <div className="mt-2">
                <p>Keyword: </p>
                <div className="flex flex-row justify-between">
                  {job?.keywords.map((word) => (
                    <div className="mt-2 border">
                      <p>{word}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex-row">
                <p className="text-sm font-medium">Job Description: </p>
                <p className="text-sm font-light">{job?.description}</p>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onApplyHandler()}
                disabled={user?.appliedJobs.includes(job?.id!)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {user?.appliedJobs.includes(job?.id!) ? "Already Applied" : "Apply"}
              </button>
              <button
                type="button"
                onClick={() => onModalClose()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
