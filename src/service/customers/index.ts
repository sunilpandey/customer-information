import { SORT_ORDERS } from "../../core/constants";
import type {
  CustomerAttributes,
  CustomerDataModel,
  CustomerListResponse,
  CustomerMembership,
} from "./data/customer";

interface GetCustomerRequest {
  _page?: number;
  _per_page?: number;
  _order?: string;
  q?: string;
}
export function customerService() {
  async function getCustomers({
    _page = 1,
    _per_page = 10,
    _order = SORT_ORDERS.DESC,
    q = "",
  }: GetCustomerRequest): Promise<CustomerListResponse> {
    const response = await fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}/customers?${new URLSearchParams(
        {
          _page: String(_page),
          _per_page: String(_per_page),
          _sort: `${_order === SORT_ORDERS.ASC ? "createdAt" : "-createdAt"}`,
          company: q,
        }
      ).toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch customers");
    }
  }

  async function getAllCustomers(): Promise<CustomerDataModel[]> {
    const response = await fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}/customers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch all customers");
    }
  }

  async function getAllAttributes(): Promise<CustomerAttributes[]> {
    const response = await fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}/attributes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch all customer attributes");
    }
  }

  async function getCustomerMembership(): Promise<CustomerMembership[]> {
    const response = await fetch(
      `${import.meta.env.VITE_CUSTOMER_API_URL}/memberships`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch customer membership");
    }
  }

  async function getCustomerAttributes(
    customers: CustomerDataModel[]
  ): Promise<CustomerAttributes[]> {
    const promiseArray = customers.map((customer) =>
      fetch(
        `${import.meta.env.VITE_CUSTOMER_API_URL}/attributes?customerId=${
          customer.id
        }`
      ).then((response) => response.json())
    );
    const attributesArray = await Promise.all(promiseArray);
    return attributesArray.map((attr) => attr[0]);
  }

  return {
    getAllCustomers,
    getCustomers,
    getCustomerAttributes,
    getCustomerMembership,
    getAllAttributes,
  };
}
