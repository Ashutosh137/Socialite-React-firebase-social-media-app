import { twMerge } from "tailwind-merge";
function Button({ children, className }) {
  return (
    <button
      className={twMerge(
        "rounded-xl text-lg mx-2 md:text-xl border-white my-6 p-4 sm:p-6 py-1 sm:py-2 max-w-80  border-1 capitalize bg-sky-600 hover:scale-105 transition-all ease",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
