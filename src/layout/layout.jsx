import Navbar from "../layout/navbar/navbar";
import Suggestion from "../component/suggestion";

export const Layout = ({ Component, suggetion = true }) => {
  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <div className="mt-8  md:pl-36 xl:pl-56  w-full md:mt-0">
        <Component />
      </div>

      {suggetion && (
        <div className="w-4/12  border-l-2 border-gray-400 hidden xl:block">
          <Suggestion />
        </div>
      )}
    </div>
  );
};
