import React, { useEffect, useState } from "react";
import Profileviewbox from "./profileviewbox";
import Search from "./search";
import { getallprofile } from "../service/Auth/database";
import { useUserdatacontext } from "../service/context/usercontext";
export default function Suggestion({ bio = false }) {
  const [alluser, setalluser] = useState([]);
  const { userdata } = useUserdatacontext();
  useEffect(() => {
    const dataforallusers = async () => {
      const alluser = await getallprofile();
      setalluser(alluser);
    };
    dataforallusers();
  }, []);

  if (alluser == []) {
    return <></>;
  }

  return (
    <section className=" sm:mx-2 w-full">
      <div className="flex flex-col space-y-4">
        <div>
          <Search bio={bio} />
        </div>
        <div className="flex justify-center flex-col">
          <h2 className="text-2xl text-center text-white capitalize my-5 font-semibold">
            People you may know
          </h2>

          <div className="flex justify-center w-96 m-auto space-y-3 flex-col">
            {alluser.length === 0 && (
              <div className="flex items-center w-full h-96 justify-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
            {alluser.map((proflie, index) => {
              return (
                proflie?.username !== userdata?.username && (
                  <Profileviewbox bio={bio} key={index} profile={proflie} />
                )
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
