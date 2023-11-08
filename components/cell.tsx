import { CellType } from "@/types";
import { classNames } from "@/utils/strings";

type CellProps = {
  type: CellType;
  onClick: () => void;
  "data-testid"?: string;
};

export const Cell = ({ type, onClick, ...rest }: CellProps) => {
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
      {...rest}
      onClick={onClick}
      className={classNames("grid-cell", getClasses(type))}
    />
  );
};
