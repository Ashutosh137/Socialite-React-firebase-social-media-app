import Navbar from "../layout/navbar/navbar";
import Suggestion from "../component/suggestion";

export const Layout = ({ Component, suggetion = true }) => {
  return (
    <div className="flex w-full justify-around  ">
      <Navbar />
      <Component />

      {suggetion && (
        <div className="w-1/4 hidden xl:block">
          <Suggestion />
        </div>
      )}
    </div>
  );
};
