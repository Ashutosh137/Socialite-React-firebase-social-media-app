import Profileviewbox from "../layout/profile/profileviewbox";
import Search from "../layout/explore/search";
import { useUserdatacontext } from "../service/context/usercontext";
import Loading from "../layout/loading";

export default function Suggestion({ bio = false }) {
  const { userdata, GetAllusers } = useUserdatacontext();

  if (GetAllusers == []) {
    return <></>;
  }

  return (
    <section className="flex  justify-center w-full min-h-screen p-4">
      <div className="flex flex-col w-full max-w-2xl space-y-4">
        <div className="w-full">
          <Search bio={bio} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-center text-white capitalize my-5 font-semibold">
            People you may know
          </h2>

          <div className="flex justify-center w-full  min-w-80   space-y-3 flex-col">
            {GetAllusers.length === 0 && <Loading />}
            <div className="overflow-y-scroll scroll-hidden flex flex-col items-center max-h-[80rem]">
              {GetAllusers.map(
                (profile, index) =>
                  profile?.username !== userdata?.username && (
                    <Profileviewbox bio={bio} key={index} profile={profile} />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
