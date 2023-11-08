import { classNames } from "@/utils/strings";

import { HTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) => (
  <button
    className={classNames(
      "py-2 px-6 bg-slate-300 text-slate-900 rounded-lg shadow-md hover:-translate-y-0.5 transition-all",
      className
    )}
    {...rest}
  >
    {children}
  </button>
);
