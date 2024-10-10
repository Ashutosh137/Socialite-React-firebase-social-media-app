import PropTypes from "prop-types";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useEffect } from "react";

const Popupcenter = ({ children, closefunction = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <section className="backdrop-blur-sm z-50 fixed  flex bg-black/80 left-0 top-0 w-full h-full ">
      <div className="relative">
        <div className="text-4xl absolute inset-0  p-4 z-40">
          <button onClick={closefunction}>
            <CloseFullscreenIcon />
          </button>
        </div>
      </div>
      <div className="max-h-[30rem] flex items-center justify-center my-8 w-full p-1 mr-4 overflow-scroll scroll-hidden ">
        {children}
      </div>
    </section>
  );
};

Popupcenter.defaultProps = {
  closefunction: () => {},
};

Popupcenter.propTypes = {
  children: PropTypes.node.isRequired,
  closefunction: PropTypes.func,
};

export { Popupcenter };
