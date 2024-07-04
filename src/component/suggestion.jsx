import Profileviewbox from "../layout/profile/profileviewbox";
import Search from "../layout/explore/search";
import { useUserdatacontext } from "../service/context/usercontext";
import Loading from "../layout/loading";
export default function Suggestion({ bio = false }) {
  const { userdata ,GetAllusers} = useUserdatacontext();

  if (GetAllusers == []) {
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
            {GetAllusers.length === 0 && (
             <Loading/>
            )}
            {GetAllusers.map((proflie, index) => {
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
