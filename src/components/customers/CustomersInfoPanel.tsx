import { CustomerInfo } from "./CustomerInfo";
import { useCustomerStats } from "../../hooks/useCustomerStats";
import { TrendInfo } from "../common/TrendInfo";
import { getPercentageIncrease } from "../../core/utils";
import { ActiveCustomerAvatars } from "./ActiveCustomersAvatar";
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { useTranslation } from "react-i18next";
interface CustomerInfoPanelProps {
  durationText: "today" | "this month" | "this year";
}

export function CustomerInfoPanel({
  durationText,
}: CustomerInfoPanelProps) {
  const {
    membersLastMonth,
    presentMembers,
    totalCustomers,
    activeCustomers,
    totalCustomersLastMonth,
  } = useCustomerStats();
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 p-4 rounded-lg justify-between bg-white w-full">
      <CustomerInfo
        total={totalCustomers ?? 0}
        icon={<GroupOutlinedIcon style={{fontSize: '2.5rem'}} className="text-green-800 text-2xl" />}
        heading={t("Total_Customers")}
        className="shrink-0"
      >
        <TrendInfo
          increase={getPercentageIncrease(
            totalCustomersLastMonth,
            totalCustomers
          )}
          durationText={durationText}
        />
      </CustomerInfo>

      <CustomerInfo
        total={presentMembers ?? 0}
        icon={<GroupAddOutlinedIcon style={{ fontSize: '2.5rem' }} className="text-green-800" />}
        heading={t("Members")}
        className="border-l-1 border-gray-200 pl-10 shrink-0"
      >
        <TrendInfo
          increase={getPercentageIncrease(
            membersLastMonth ?? 0,
            presentMembers ?? 0
          )}
          durationText={durationText}
        />
      </CustomerInfo>
      <CustomerInfo
        total={activeCustomers ?? 0}
        icon={<ComputerOutlinedIcon style={{ fontSize: '2.5rem' }} className="text-green-800" />}
        heading={t("Active_Now")}
        className="border-l-1 border-gray-200 pl-10 shrink-0"
      >
        <ActiveCustomerAvatars />
      </CustomerInfo>
    </div>
  );
}