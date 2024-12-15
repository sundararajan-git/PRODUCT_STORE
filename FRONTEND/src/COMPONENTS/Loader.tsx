import { TbLoader3 } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full w-full ">
      <TbLoader3 className="text-blue-1100 animate-spin" size={35} />
      <span className="font-semibold text-blue-1100">Please Wait...</span>
    </div>
  );
};

export default Loader;
