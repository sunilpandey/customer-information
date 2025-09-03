import { createContext } from "react";
import { customerService } from '../service/customers';
import { customerAggregatorService } from '../service/customers/agregator';


interface CustomerContextType {
    customerService: ReturnType<typeof customerService>;
    customerAggregatorService: ReturnType<typeof customerAggregatorService>;
}

const CustomerContext = createContext<CustomerContextType | null>(null);


interface CustomerContextProviderProps {
    children: React.ReactNode;
}

export default function CustomerContextProvider({ children }: CustomerContextProviderProps) {
    const customerServiceInstance = customerService();
    const customerAggregatorServiceInstance = customerAggregatorService(customerServiceInstance);
    if(!customerServiceInstance) {
        throw new Error("Failed to create customer service");
    }

    return (
      <CustomerContext.Provider
        value={{
          customerService: customerServiceInstance,
          customerAggregatorService: customerAggregatorServiceInstance,
        }}
      >
        {children}
      </CustomerContext.Provider>
    );
}

export { CustomerContext }
