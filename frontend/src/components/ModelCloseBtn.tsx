import { IoMdClose } from "react-icons/io";

const ModelCloseBtn = (props: any) => {
  const { onClick, disabled } = props;
  return (
    <button
      type="button"
      className="text-gray-600 bg-transparent hover:bg-red-100 dark:hover:bg-transparent hover:text-red-600 rounded-[6px]  w-8 h-8 ms-auto inline-flex justify-center items-center closeAll"
      onClick={onClick}
      disabled={disabled}
    >
      <IoMdClose size={20} />
    </button>
  );
};

export default ModelCloseBtn;
