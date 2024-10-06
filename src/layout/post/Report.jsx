import React from "react";
import { Popupitem } from "../../ui/popup";
import { auth } from "../../service/Auth";
import { toast } from "react-toastify";

function Report({ setactive }) {
  return (
    <Popupitem
      closefunction={() => {
        setactive("");
      }}
    >
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
            className="px-8 outline outline-neutral-800 capitalize m-auto p-2 rounded-full hover:bg-gray-950 bg-gray-900 text-white"
          >
            cancel
          </button>
          <button
            onClick={() => {
              setactive("");
              auth.currentUser && toast.success("Report sucessfully");
            }}
            className="px-8 capitalize m-auto p-2 rounded-full hover:bg-red-700 bg-red-600 text-white"
          >
            report
          </button>
        </div>
      </div>
    </Popupitem>
  );
}

export default Report;
