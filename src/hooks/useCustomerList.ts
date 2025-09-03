import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCustomerService } from "../context/hooks/useCustomerService";
import type { CustomerAttributes, CustomerListResponse } from '../service/customers/data/customer';
import { customerDomainModel } from "../domain/customerDomainModel";
import type { Customer } from "../domain/customer";
import i18n from "../i18n";
interface ColumnHeader {
    key: string;
    label: string;
}

const columnHeaders: ColumnHeader[] = [
    { key: "name", label: i18n.t("Name") },
    { key: "company", label: i18n.t("Company") },
    { key: "phoneNumber", label: i18n.t("Phone") },
    { key: "email", label: i18n.t("Email") },
    { key: "country", label: i18n.t("Country") },
    { key: "status", label: i18n.t("Status") },
];

const TOTAL_PER_PAGE = 10;

export function useCustomerList(pageNumber: number, sortOrder: string, searchTerm: string): {
    isLoading: boolean;
    isError: boolean;
    error: unknown | null;
    columnHeaders: ColumnHeader[];
    customerList: Customer[];
    totalCustomer: number;
    totalPerPage: number;
} {
    const { getCustomerAttributes, getCustomers } = useCustomerService();

    const {
      data: customerListResponse,
      isLoading: isCustomersLoading,
      isError: isCustomersError,
      error: customersError,
    } = useQuery<CustomerListResponse>({
      queryKey: ["customers", pageNumber, sortOrder, searchTerm],
      queryFn: () =>
        getCustomers({ _page: pageNumber, _per_page: TOTAL_PER_PAGE, _order: sortOrder, q: searchTerm }),
    });

    const { data: customersAttributes, isLoading: isAttributesLoading, isError: isAttributesError, error: attributesError } = useQuery<CustomerAttributes[]>({
        queryKey: ["customerAttributes", pageNumber, searchTerm, sortOrder],
        queryFn: () => getCustomerAttributes(customerListResponse?.data ?? []),
        enabled: !!customerListResponse?.data?.length,
    });

    const isLoading = isCustomersLoading || isAttributesLoading;
    const isError = isCustomersError || isAttributesError;
    const error = customersError || attributesError || null;

    const customerList = useMemo(() => {
        if (isLoading || isError || !customerListResponse?.data || !customersAttributes) {
            return [];
        }

        const { getCustomerDetails } = customerDomainModel();
        return customerListResponse.data.map((data, index) =>
            getCustomerDetails({
                customerData: data,
                customerAttributes: customersAttributes[index] ?? {},
            })
        );
    }, [customerListResponse, customersAttributes, isLoading, isError]);

    return {
        isLoading,
        isError,
        error,
        columnHeaders,
        customerList,
        totalCustomer: customerListResponse?.items || 0,
        totalPerPage: TOTAL_PER_PAGE,
    };
}