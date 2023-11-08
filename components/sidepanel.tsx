import { HTMLAttributes } from "react";

type SidePanelProps = HTMLAttributes<HTMLDivElement>;

export const SidePanel = ({ children, ...rest }: SidePanelProps) => (
  <div {...rest} className="flex flex-col justify-center items-center w-full">
    {children}
  </div>
);
