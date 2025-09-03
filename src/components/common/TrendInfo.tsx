import ArrowUpwardOutlined from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
interface TrendInfoProps {
  increase: number;
  durationText: "today" | "this month" | "this year";
}

export function TrendInfo({ increase, durationText }: TrendInfoProps) {
  const trendClass = increase < 0 ? "text-red-500" : "text-green-800";
  const trendIcon =
    increase < 0 ? <ArrowDownwardOutlinedIcon /> : <ArrowUpwardOutlined />;
  return (
    <div className="flex gap-1">
      <div className={`${trendClass} font-medium`}>
        {trendIcon} {` ${increase}%`}
      </div>
      <div>{durationText}</div>
    </div>
  );
}