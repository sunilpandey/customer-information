import { useContext } from "react";
import { CustomerContext } from "../CustomerContext";

export function useCustomerAggregatorService() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomerAggregatorService must be used within a CustomerContextProvider");
  }
  return context.customerAggregatorService;
}
