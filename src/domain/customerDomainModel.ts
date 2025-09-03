import type { CustomerAttributes, CustomerDataModel, CustomerMembership } from "../service/customers/data/customer";
import type { Customer } from "./customer";

interface GetCustomerDetailsParams {
  customerData: CustomerDataModel;
  customerAttributes: CustomerAttributes;
}

interface GetCustomersListParams {
  customerData: CustomerDataModel[];
  customersAttributes: CustomerAttributes[];
  customersMembership: CustomerMembership[];
}

export function customerDomainModel() {
  /**
   * @param param0 
   * @returns 
   */
  function getCustomerDetails({
    customerData,
    customerAttributes,
  }: GetCustomerDetailsParams): Customer {
    const customer: Customer = {
      name: customerData.name,
      company: customerData.company,
      phoneNumber: customerData.phone,
      email: customerData.email,
      country: customerData.country,
      status: customerAttributes.status,
      profilePicUrl: customerData.profilePicUrl,
      creationDate: customerData.createdAt,
    };
    return customer;
  }

  /**
   * 
   * @param param0 
   * @returns 
   */
  function getCustomersList({
    customerData,
    customersAttributes,
  }: GetCustomersListParams): Customer[] {
    return customerData.map((data, index) => {
      const attributes = customersAttributes[index];
      return getCustomerDetails({
        customerData: data,
        customerAttributes: attributes,
      });
    });
  }


  return {
    getCustomerDetails,
    getCustomersList
  };
}
