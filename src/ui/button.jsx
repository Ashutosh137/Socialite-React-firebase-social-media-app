import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
function Button({ children, className }) {
  return (
    <button
      className={twMerge(
        "rounded-xl text-lg mx-3 md:text-xl border-white my-6 p-4 sm:p-6 py-1 sm:py-2  border-1 capitalize bg-sky-600 hover:scale-105 transition-all ease",
        className
      )}
    >
      {children}
    </button>
  );
}
// Button.PropTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string,
// };

export default Button;
