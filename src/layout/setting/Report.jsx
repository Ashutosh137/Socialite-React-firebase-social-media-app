import React, { useState } from "react";
import { toast } from "react-toastify";

function Report() {
  const [reportitle, setreportitle] = useState("");
  const [report, setreport] = useState("");
  return (
    <section className="w-full  p-2 text-sm sm:text-base text-left capitalize">
      <h1 className="text-center text-xl">report a problem</h1>
      <div className="my-5 flex flex-col justify-center space-y-3">
        <div className="flex-col flex space-y-1">
          <label className=" p-2 mx-3 "> report title</label>
          <input
            type="text"
            name="name"
            placeholder="Report Title"
            value={reportitle}
            className="px-5 placeholder:capitalize bg-black placeholder:text-neutral-500  sm:text-lg text-sm p-2 rounded-xl   "
            onChange={(e) => setreportitle(e.target.value)}
            autoFocus
          ></input>
        </div>
        <div className="flex-col flex space-y-1">
          <label className="p-2 mx-3 "> discribe your problem</label>

          <textarea
            type="text"
            rows={3}
            placeholder="discribe your problem in brirf "
            value={report}
            className="px-5 placeholder:capitalize bg-black   placeholder:text-neutral-500  sm:text-lg text-sm p-2  rounded-xl   "
            onChange={(e) => setreport(e.target.value)}
          ></textarea>
        </div>
        <div className=" m-auto">
          <button
            onClick={() => {
              reportitle !== "" &&
                toast.success(`Reported sucessfully on  ${reportitle}`);
              setreport("");
              setreportitle("");
            }}
            className="bg-blue-500 hover:bg-blue-600 rounded-full m-auto  shadow-lg capitalize p-3 px-5 w-60 my-3 font-semibold "
          >
            report
          </button>
        </div>
      </div>
    </section>
  );
}

export default Report;
