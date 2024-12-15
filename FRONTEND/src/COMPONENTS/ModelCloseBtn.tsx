import { IoMdClose } from "react-icons/io";

const ModelCloseBtn = (props: any) => {
  // PROPS
  const { onClick } = props;
  return (
    <button
      type="button"
      className="text-gray-600 bg-transparent hover:bg-red-100 hover:text-red-600 rounded-lg  w-8 h-8 ms-auto inline-flex justify-center items-center closeAll"
      onClick={onClick}
    >
      <IoMdClose size={20} />
    </button>
  );
};

export default ModelCloseBtn;
