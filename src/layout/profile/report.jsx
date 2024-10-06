import React from "react";
import { toast } from "react-toastify";
function Report({ setactive, setprofileuserdata }) {
  return (
    <div className="max-w-sm m-auto mb-10">
      <p className="text-xl text-center my-7 capitalize ">report this post</p>
      <select className="mx-2 w-full my-8 p-3 bg-black capitalize text-white text-base border-2 px-4 border-white rounded-xl ">
        {" "}
        <option value="hateSpeech">Hate Speech</option>
        <option value="spam">Spam</option>
        <option value="harassment">Harassment</option>
        <option value="violence">Violence</option>
        <option value="falseInformation">False Information</option>
        <option value="inappropriateContent">Inappropriate Content</option>
        <option value="copyrightViolation">Copyright Violation</option>
        <option value="impersonation">Impersonation</option>
      </select>
      <div className="flex justify-between">
        <button
          onClick={() => {
            setactive("");
          }}
          className="px-8 outline outline-neutral-800 capitalize m-auto p-2 text-base rounded-full hover:bg-gray-950 bg-gray-900 text-white"
        >
          cancel
        </button>
        <button
          onClick={() => {
            setactive("");
            toast.success("Report sucessfully");
            setprofileuserdata && setprofileuserdata((prev) => ({
              ...prev,
              report: [...prev.report, userdata?.uid],
            }));
          }}
          className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-600 bg-red-500 text-base font-semibold text-white"
        >
          report
        </button>
      </div>
    </div>
  );
}

export default Report;
