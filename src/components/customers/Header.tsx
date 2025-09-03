import { useUserContext } from "../../context/hooks/useUserContext";
import { NavBar } from "../common/NavBar";
import { CustomerInfoPanel } from "./CustomersInfoPanel";
export function Header() {
  const { user } = useUserContext();
  return (
    <div className="flex flex-col gap-6">
      <NavBar userName={user.userName} />
      <CustomerInfoPanel durationText="this month" />
    </div>
  );
}
