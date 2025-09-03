import DashboardIcon from '@mui/icons-material/Dashboard';
import { useUserContext } from '../../context/hooks/useUserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HighlightIcon from '@mui/icons-material/Highlight';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { UserPanel } from './UserPanel';
import { SideMenu } from '../common/SideMenu';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
const MenuItems = [
  { id: "dashboard", label: i18n.t("Dashboard"), href: "#", icon: <SpaceDashboardIcon /> },
  { id: "products", label: i18n.t("Products"), href: "#", icon: <InventoryIcon /> },
  { id: "customers", label: i18n.t("Customers"), href: "#", icon: <PermIdentityIcon /> },
  { id: "income", label: i18n.t("Income"), href: "#", icon: <AttachMoneyIcon /> },
  { id: "promote", label: i18n.t("Promote"), href: "#", icon: <HighlightIcon /> },
  { id: "help", label: i18n.t("Help"), href: "#", icon: <QuickreplyIcon /> },
];

export function LeftPanel() {
  const [activeItem, setActiveItem] = useState("customers");
  const { t } = useTranslation();
  const { user } = useUserContext()
  const navigate = useNavigate()
  function setRoute(item: string) {
    if(item === "customers") {
      setActiveItem("customers");
      navigate("/customers");
    } else {
      setActiveItem(item);
      navigate("/under-construction");
    }
  }
  return (
    <div className="flex flex-col gap-4 p-4 justify-between bg-white shadow-xl rounded-lg w-64 shrink-0">
      <div className="flex flex-col">
        <div className="font-bold text-2xl pb-6 pt-2 text-gray-800 flex items-center">
        <div>
          <DashboardIcon />
        </div>
        <div className="pl-3 pt-1">
          <span>{t("Dashboard")}</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {MenuItems.map((item) => (
          <SideMenu
            key={item.id}
            label={item.label}
            icon={item.icon}
            id={item.id}
            active={item.id === activeItem}
            iconClick={() => setRoute(item.id)}
          />
        ))}
      </ul>
      </div>
      <div className="pb-6">
        <UserPanel user={user} />
      </div>
    </div>
  );
}