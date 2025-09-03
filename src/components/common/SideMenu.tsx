import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { JSX } from 'react';
interface SideMenuProps {
  label: string;
  icon: JSX.Element;
  id: string;
  active: boolean;
  iconClick: (id: string) => void;
}
export function SideMenu({ label, icon, id, active, iconClick }: SideMenuProps) {
  return (
    <li
      className={`flex items-center justify-between p-2 rounded-md 
        cursor-pointer
        ${
          !active
            ? "hover:text-gray-800 hover:bg-gray-100"
            : "hover:bg-blue-800"
        } ${active ? "bg-blue-500" : ""} ${active ? "text-white" : "text-gray-800"}`}
      onClick={() => iconClick(id)}
    >
      <div className="flex items-center">
        <div className="mr-2">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>

      <span className="font-medium">
        <ArrowForwardIosIcon />
      </span>
    </li>
  );
}