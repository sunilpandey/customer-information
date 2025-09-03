
import { useContext } from "react";
import { CustomerContext } from "../CustomerContext";
export function useCustomerService() {
    const context = useContext(CustomerContext);
    if (!context?.customerService) {
        throw new Error("useCustomerService must be used within a CustomerContextProvider");
    }
    return context.customerService;
}