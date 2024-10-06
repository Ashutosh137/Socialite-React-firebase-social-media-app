import Navbar from "../layout/navbar/navbar";
import Suggestion from "../component/suggestion";

export const Layout = ({ Component, suggetion = true }) => {
  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <div className="mt-5 w-full sm:mt-0">
        <Component />
      </div>

      {suggetion && (
        <div className="w-1/4  border-l-2 border-gray-400 hidden xl:block">
          <Suggestion />
        </div>
      )}
    </div>
  );
};
