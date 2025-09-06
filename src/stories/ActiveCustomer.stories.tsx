import { ActiveCustomerAvatars } from "../components/customers/ActiveCustomersAvatar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  
  useQuery,
} from "@tanstack/react-query";
import { useCustomerAggregatorService } from "../context/hooks/useCustomerAggregatorService";

// Mock data
const mockCustomers = [
  {
    id: "1",
    name: "Customer A",
    profilePicUrl: "https://via.placeholder.com/150/FF5733/FFFFFF?text=A",
  },
  {
    id: "2",
    name: "Customer B",
    profilePicUrl: "https://via.placeholder.com/150/33FF57/FFFFFF?text=B",
  },
  {
    id: "3",
    name: "Customer C",
    profilePicUrl: "https://via.placeholder.com/150/3357FF/FFFFFF?text=C",
  },
  {
    id: "4",
    name: "Customer D",
    profilePicUrl: "https://via.placeholder.com/150/FFFF33/FFFFFF?text=D",
  },
  {
    id: "5",
    name: "Customer E",
    profilePicUrl: "https://via.placeholder.com/150/FF33FF/FFFFFF?text=E",
  },
];

// Mock the useCustomerAggregatorService hook
jest.mock("../../context/hooks/useCustomerAggregatorService", () => ({
  useCustomerAggregatorService: jest.fn(),
}));

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"), // Use actual implementation for other exports
  useQuery: jest.fn(),
}));

const meta = {
  title: "Components/ActiveCustomerAvatars",
  component: ActiveCustomerAvatars,
  tags: ["autodocs"],
} satisfies Meta<typeof ActiveCustomerAvatars>;

export default meta;
type Story = StoryObj<typeof meta>;

// Set up a consistent mock for useCustomerAggregatorService
const setupServiceMock = () => {
  useCustomerAggregatorService.mockReturnValue({
    getActiveCustomerList: jest.fn().mockResolvedValue(mockCustomers),
  });
};

export const Default: Story = {
  name: "Default State",
  render: () => {
    setupServiceMock();
    useQuery.mockReturnValue({ data: mockCustomers, isLoading: false, isError: false });
    return <ActiveCustomerAvatars />;
  },
};

export const Loading: Story = {
  name: "Loading State",
  render: () => {
    setupServiceMock();
    useQuery.mockReturnValue({ data: undefined, isLoading: true, isError: false });
    return <ActiveCustomerAvatars />;
  },
};

export const Empty: Story = {
  name: "Empty State",
  render: () => {
    setupServiceMock();
    useQuery.mockReturnValue({ data: [], isLoading: false, isError: false });
    return <ActiveCustomerAvatars />;
  },
};