import { useJobsStore } from "@/store/jobsStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Pagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { jobs } = useJobsStore();
  const totalPages = jobs && Math.ceil(jobs?.meta.total / jobs?.meta.perPage);
  const [page, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState("100");

  useEffect(() => {
    const currentPage = params!.get("page");
    const currentPerPage = params!.get("perPage");
    if (currentPage) setPageNumber(parseInt(currentPage));
    if (currentPerPage) setPerPage(currentPerPage);
  }, [params]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("page", page.toString());
    searchParams.set("perPage", perPage);

    router.push(`${pathname}?${searchParams.toString()}`);
  }, [page, perPage]);

  const perPageHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const pageChangeHandle = (type: string) => {
    if (type === "next") {
      setPageNumber((prev) => prev + 1);
    } else if (type === "previous") {
      setPageNumber((prev) => Math.max(1, prev - 1));
    }
  };

  const showPerPageValues = ["5", "10", "100"];

  return (
    <div className="grid grid-cols-12 bg-gray-200 p-4">
      <div className="md:col-span-4"></div>
      <div className="col-span-8 md:col-span-4 flex gap-3">
        <button
          className="btn border-2 bg-white px-2 border-black"
          onClick={() => pageChangeHandle("previous")}
        >
          Previous
        </button>
        <div className="items-center flex">
          {jobs?.meta.page} / {totalPages}
        </div>
        <button
          className="btn border-2 bg-white px-2 border-black"
          onClick={() => pageChangeHandle("next")}
        >
          Next
        </button>
      </div>
      <div className="col-span-2 md:col-span-4">
        <div className="text-right float-end flex gap-2 items-center">
          <small>Show</small>
          <select
            value={perPage}
            onChange={perPageHandle}
            id="countries"
            className="w-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {showPerPageValues.map((val, i) => (
              <option key={`perPage-${i}`} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
