import { customerService } from "./index";
export function customerAggregatorService(
  customerServiceInstance: ReturnType<typeof customerService>
) {
  const { getAllCustomers, getCustomerMembership, getAllAttributes } =
    customerServiceInstance;
  async function getCustomerStats(): Promise<{
    totalCustomers: number;
    activeCustomers: number;
  }> {
    const allCustomers = await getAllCustomers();
    const customerAttributes = await getAllAttributes();
    const totalCustomers = allCustomers.length;
    const activeCustomers = customerAttributes.filter(
      (customer) => customer.status === "Active"
    ).length;

    return {
      totalCustomers,
      activeCustomers,
    };
  }

  async function getTotalCustomerCount(date: Date): Promise<{ totalCustomers: number }> {
    const allCustomers = await getAllCustomers();
    const totalCustomers = allCustomers.filter(customer => new Date(customer.createdAt) < date).length;
    return {
      totalCustomers,
    };
  }

  async function getActiveCustomerList(size: number) {
    const allCustomers = await getAllCustomers();
    const customerAttributes = await getAllAttributes();
    const activeCustomers = customerAttributes.filter(
      (customer) => customer.status === "Active"
    );
    const activeCustomerDetails = activeCustomers
      .slice(0, size)
      .map((customer) =>
        allCustomers.find((c) => c.id === customer.customerId)
      );
    return activeCustomerDetails;
  }

  async function getTotalMembersList(date: Date): Promise<{
    totalMembers: number;
  }> {
    // Simulate an API call to fetch total members list
    const customerMembership = await getCustomerMembership();
    const filteredMembers = customerMembership.filter((member) => {
      return (
        new Date(member.startDate) <= date && new Date(member.endDate) > date
      );
    });
    return {
      totalMembers: filteredMembers.length,
    };
  }

  return {
    getCustomerStats,
    getTotalMembersList,
    getActiveCustomerList,
    getTotalCustomerCount,
  };
}
