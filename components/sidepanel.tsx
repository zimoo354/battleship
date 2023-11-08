import { PropsWithChildren as SidePanelProps } from "react";

export const SidePanel = ({ children }: SidePanelProps) => (
  <div className="flex flex-col justify-center items-center w-full">
    {children}
  </div>
);
