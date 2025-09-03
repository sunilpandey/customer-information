import { useQuery } from "@tanstack/react-query";
import { useCustomerAggregatorService } from "../../context/hooks/useCustomerAggregatorService";
const ACTIVE_CUSTOMERS_COUNT = 5;
export function ActiveCustomerAvatars() {
  const { getActiveCustomerList } = useCustomerAggregatorService();
  const { data: activeCustomers } = useQuery({
    queryKey: ["activeCustomers", ACTIVE_CUSTOMERS_COUNT],
    queryFn: () => getActiveCustomerList(ACTIVE_CUSTOMERS_COUNT),
  });
  return (
    <div className="flex gap-0">
      {activeCustomers?.map((customer) => (
        <img
          key={customer?.id}
          src={customer?.profilePicUrl}
          alt={customer?.name}
          title={customer?.name}
          className="w-6 h-6 rounded-full"
          style={{ marginLeft: "-5px" }}
        />
      ))}
    </div>
  );
}