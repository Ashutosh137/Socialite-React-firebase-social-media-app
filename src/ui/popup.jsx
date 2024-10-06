import PropTypes from "prop-types";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useEffect } from "react";

const Popupitem = ({ children, closefunction = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <section className="backdrop-blur-sm z-50 fixed left-0 top-0 w-screen h-screen ">
      <div className="fixed shadow-gray-700 post popup shadow-2xl rounded-3xl flex border-2 border-gray-700 animinate left-1/4 top-16 bg-black text-white">
        <div className="text-4xl p-4 z-40">
          <button onClick={closefunction}>
            <CloseFullscreenIcon />
          </button>
        </div>
        <div className="max-h-popup my-8 w-full p-1 mr-4 overflow-scroll scroll-hidden ">
          {children}
        </div>
      </div>
      {/* mobile */}
      <div className="p-3 fixed sm:hidden popup post overflow-y-scroll scroll-hidden h-screen w-screen left-0 top-0 bg-black text-white">
        <div className="text-base fixed p-2 border aspect-square z-50 bg-transparent border-gray-400 rounded-3xl">
          <button onClick={closefunction}>
            <CloseFullscreenIcon />
          </button>
        </div>
        <div className="w-full pt-16">{children}</div>
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
