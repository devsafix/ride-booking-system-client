import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar */}
      <div className="grow-1">{children}</div>
      {/* footer */}
    </div>
  );
}
