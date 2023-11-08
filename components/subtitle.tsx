import { PropsWithChildren as SubtitleProps } from "react";

export const Subtitle = ({ children }: SubtitleProps) => (
  <h3 className="text-3xl text-center">{children}</h3>
);
