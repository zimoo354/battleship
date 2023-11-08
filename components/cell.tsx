import { CellType } from "@/types";
import { classNames } from "@/utils/strings";

type CellProps = {
  type: CellType;
  onClick: () => void;
};

export const Cell = ({ type, onClick }: CellProps) => {
  const getClasses = (type: CellType) => {
    switch (type) {
      case "hit":
        return "bg-red-500";
      case "miss":
        return "bg-slate-500";
      case "ship":
        return "bg-blue-400";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex h-8 w-8 justify-center items-center cursor-pointer border border-white",
        getClasses(type)
      )}
    />
  );
};
