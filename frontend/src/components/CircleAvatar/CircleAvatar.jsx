import Tooltip from "../Tooltip/Tooltip";

const CircleAvatar = ({ name, bgColor = "bg-gray-800" }) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <Tooltip text={name}>
      <div
        className={`w-8 h-8 ${bgColor} text-white rounded-full flex items-center justify-center border border-black cursor-pointer`}
      >
        {firstLetter}
      </div>
    </Tooltip>
  );
};

export default CircleAvatar;