import React, { useEffect, useState } from "react";
import { useuserdatacontext } from "../service/context/usercontext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Profileviewbox from "./profileviewbox";

export default function Block() {
  const { userdata, setuserdata } = useuserdatacontext();
  const [privacy, setprivacy] = useState(userdata?.privacy ? 1 : 0);

  useEffect(() => {
    const data = () => {
      setuserdata((prev) => ({
        ...prev,
        privacy: privacy == 1,
      }));
    };
    data();
  }, [privacy]);

  return (
    <section className="post text-center p-2 text-sm sm:text-base sm:p-5 capitalize w-full ">
      <h1 className="font-semibold text-xl">who can see your content</h1>
      <div className="my-8">
        <div className="flex justify-between">
          <label>account privacy</label>
          <input
            type="range"
            className="w-8 text-blue-500"
            value={privacy}
            onChange={(e) => {
              setprivacy(e.target.value);
            }}
            max={1}
            min={0}
            slot={2}
            name="privacy"
          />
        </div>
        <p className="text-xs my-4  px-3 text-gray-300 w-full text-left">
          When your account is public, your profile and posts can be seen by
          anyone, on or off socialite, even if they don't have an socialite
          account.
        </p>
      </div>
      <div className="text-left flex flex-col my-10">
        <label>
          blocked accounts{" "}
          <span className="font-semibold">( {userdata?.block.length} )</span>
        </label>
        {userdata.block.length > 0 && (
          <div className="flex flex-col my-5 justify-between">
            <h1 className="text-lg m-auto">blocked account list </h1>
            {userdata.block.map((profile, index) => {
              return (
                <div
                  key={index}
                  className="flex w-96 mx-auto space-x-2 justify-around "
                >
                  <Profileviewbox profileusername={profile} />
                  <i
                    className="my-auto"
                    onClick={() => {
                      setuserdata((prev) => ({
                        ...prev,
                        block: prev.block.splice(index, 1),
                      }));
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                  </i>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
