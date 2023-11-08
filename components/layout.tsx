import { PropsWithChildren } from "react";
import { CONTENT } from "@/constants/content";
import { classNames } from "@/utils/strings";
import Link from "next/link";

const { mainTitle } = CONTENT;

type LayoutProps = PropsWithChildren & {
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={"flex flex-col min-h-screen"}>
      <header className="flex justify-center items-center py-2">
        <Link href="/">
          <h1 className="text-3xl font-semibold">{mainTitle}</h1>
        </Link>
      </header>
      <main className={classNames("flex flex-1", className)}>{children}</main>
    </div>
  );
};
