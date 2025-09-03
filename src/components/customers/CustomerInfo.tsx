import { formatNumber } from "../../core/formatter";
import type { JSX } from "react";
interface CustomerInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
  icon: JSX.Element;
  heading: string;
}

export function CustomerInfo({
  total,
  heading,
  icon,
  style,
  className,
  children,
}: CustomerInfoProps) {
  return (
    <div className={`p-2 flex ${className}`} style={style}>
      <div className="rounded-full h-20 w-20 bg-green-100 p-4 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex justify-baseline items-left flex-col px-2 py-1">
        <div className="opacity-50">{heading}</div>
        <div className="font-bold">{formatNumber(total)}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}