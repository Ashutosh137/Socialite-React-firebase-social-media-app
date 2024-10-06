import { twMerge } from "tailwind-merge";
function Input({ name, placeholder, className, ...props }) {
  return (
    <div className="flex w-full flex-col space-y-1">
      {name && (
        <label htmlFor={name} className=" font-sans text-gray-100 p-1 mx-3 ">
          {name}
        </label>
      )}

      <input
        className={twMerge(
          `  placeholder:capitalize focus:border bg-black text-white outline-1 p-4 py-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500 md:text-lg text-sm  rounded-xl `,
          className,
        )}
        id={name}
        name={name}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
}

function TextInput({ name, placeholder, className, ...props }) {
  return (
    <div className="flex w-full flex-col ">
      {name && (
        <label htmlFor={name} className=" font-sans text-gray-100 p-1 mx-3 ">
          {name}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        className={twMerge(
          " p-5 py-3 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-full md:text-lg text-sm  border-1  rounded-2xl my-1  ",
          className,
        )}
        id={name}
        name={name}
        {...props}
      />
    </div>
  );
}

export { Input, TextInput };
