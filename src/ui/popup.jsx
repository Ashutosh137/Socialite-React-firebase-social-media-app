import PropTypes from "prop-types";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useEffect } from "react";

const Popupitem = ({ children, closefunction = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="fixed inset-0 z-50 flex items-center  justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50"
        onClick={closefunction}
      ></div>

      {/* Popup content */}
      <div className="relative z-50 shadow-gray-700 shadow-2xl rounded-3xl border-2 pt-10  overflow-y-auto scroll-hidden border-gray-700 bg-black text-white p-6 max-h-[75vh] w-11/12 sm:w-3/4 lg:w-1/2 ">
        <button
          className="absolute border rounded-full p-2 top-4 right-4 text-white"
          onClick={closefunction}
        >
          <CloseFullscreenIcon />
        </button>
        <div className="">{children}</div>
      </div>
    </section>
  );
};

Popupitem.defaultProps = {
  closefunction: () => {},
};

Popupitem.propTypes = {
  children: PropTypes.node.isRequired,
  closefunction: PropTypes.func,
};

export { Popupitem };
