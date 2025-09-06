import type { Meta, StoryObj } from '@storybook/react-vite';
import { vi } from 'vitest'; // Import Vitest for mocking
import { CustomerTable } from '../components/customers/table';
import { SORT_ORDERS } from '../core/constants';
import type { Customer } from '../domain/customer';

// Mock data
const mockCustomers: Customer[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1-555-0101',
    company: 'Acme Corp',
    country: 'USA',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'Active',
    creationDate: '2024-01-15',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '+1-555-0102',
    country: 'USA',
    company: 'Tech Solutions Inc',
    profilePicUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'Active',
    creationDate: '2024-01-20',
  },
  {
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    phoneNumber: '+1-555-0103',
    country: 'USA',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    company: 'Global Enterprises',
    status: 'Inactive',
    creationDate: '2024-02-01',
  },
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phoneNumber: '+1-555-0104',
    country: 'USA',
    company: 'Creative Agency',
    status: 'Active',
    profilePicUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    creationDate: '2024-02-10',
  },
  {
    name: 'David Lee',
    email: 'david.lee@example.com',
    phoneNumber: '+1-555-0105',
    country: 'USA',
    company: 'Innovation Labs',
    status: 'Active',
    profilePicUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    creationDate: '2024-02-15',
  },
];

const mockColumnHeaders = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'company', label: 'Company' },
  { key: 'status', label: 'Status' },
  { key: 'creationDate', label: 'Created Date' },
];

// Create mock hook implementation
const createMockHook = (options: {
  customers?: Customer[];
  totalCustomers?: number;
  totalPerPage?: number;
  isLoading?: boolean;
  error?: string;
}) => {
  const {
    customers = mockCustomers,
    totalPerPage = 10,
    isLoading = false,
    error = null,
  } = options;

  return (pageNumber: number, sortOrder: string, searchTerm: string) => {
    // Simulate filtering
    let filteredCustomers = customers;
    if (searchTerm) {
      filteredCustomers = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Simulate sorting
    const sorted = [...filteredCustomers].sort((a, b) => {
      const aDate = new Date(a.creationDate).getTime();
      const bDate = new Date(b.creationDate).getTime();
      return sortOrder === SORT_ORDERS.ASC ? aDate - bDate : bDate - aDate;
    });

    // Simulate pagination
    const startIndex = (pageNumber - 1) * totalPerPage;
    const paginatedCustomers = sorted.slice(startIndex, startIndex + totalPerPage);

    return {
      columnHeaders: mockColumnHeaders,
      customerList: paginatedCustomers,
      totalPerPage,
      totalCustomer: filteredCustomers.length,
      isLoading,
      error,
    };
  };
};

// Default mock
const defaultMockHook = createMockHook({});

const meta = {
  title: 'Components/CustomerTable',
  component: CustomerTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A table component for displaying customer data with sorting, searching, and pagination functionality',
      },
    },
    mockData: {
      customers: mockCustomers,
      columnHeaders: mockColumnHeaders,
    },
  },
  decorators: [
    (Story, context) => {
      // Get the mock hook from parameters or use default
      const mockHook = context.parameters.mockHook || defaultMockHook;

      // Mock the useCustomerList hook
      vi.mock('../../../hooks/useCustomerList', () => ({
        useCustomerList: mockHook,
      }));

      return <Story />;
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CustomerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with sample data
export const Default: Story = {
  parameters: {
    mockHook: createMockHook({}),
  },
};

// Story with many customers (pagination)
export const WithPagination: Story = {
  parameters: {
    mockHook: createMockHook({
      customers: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phoneNumber: `+1-555-${String(i + 100).padStart(4, '0')}`,
        country: 'USA',
        company: `Company ${i + 1}`,
        profilePicUrl: `https://randomuser.me/api/portraits/men/${(i % 50) + 1}.jpg`, // Ensure valid image URLs
        status: i % 2 === 0 ? 'Inactive' : 'Active',
        creationDate: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      })),
      totalPerPage: 10,
    }),
    docs: {
      description: {
        story: 'Table with many customers showing pagination controls',
      },
    },
  },
};

// Story with no data
export const EmptyState: Story = {
  parameters: {
    mockHook: createMockHook({
      customers: [],
      totalCustomers: 0,
    }),
    docs: {
      description: {
        story: 'Table with no customer data',
      },
    },
  },
};

// Story with loading state
export const Loading: Story = {
  parameters: {
    mockHook: () => ({
      columnHeaders: mockColumnHeaders,
      customerList: [],
      totalPerPage: 10,
      totalCustomer: 0,
      isLoading: true,
      error: null,
    }),
    docs: {
      description: {
        story: 'Table in loading state',
      },
    },
  },
};

// Story with error state
export const ErrorState: Story = {
  parameters: {
    mockHook: () => ({
      columnHeaders: mockColumnHeaders,
      customerList: [],
      totalPerPage: 10,
      totalCustomer: 0,
      isLoading: false,
      error: 'Failed to load customer data. Please try again.',
    }),
    docs: {
      description: {
        story: 'Table showing error state',
      },
    },
  },
};

// Story with search results
export const WithSearchResults: Story = {
  parameters: {
    mockHook: createMockHook({
      customers: mockCustomers.filter((c) => c.name.toLowerCase().includes('john')),
    }),
    docs: {
      description: {
        story: 'Table showing filtered results for search term "john"',
      },
    },
  },
};

// Story with small page size
export const SmallPageSize: Story = {
  parameters: {
    mockHook: createMockHook({
      totalPerPage: 3,
    }),
    docs: {
      description: {
        story: 'Table with only 3 items per page',
      },
    },
  },
};

// Story with single page
export const SinglePage: Story = {
  parameters: {
    mockHook: createMockHook({
      customers: mockCustomers.slice(0, 3),
      totalPerPage: 10,
    }),
    docs: {
      description: {
        story: 'Table with few items that fit in a single page',
      },
    },
  },
};

// Mobile view
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    mockHook: createMockHook({
      customers: mockCustomers.slice(0, 3),
    }),
    docs: {
      description: {
        story: 'Table displayed on mobile viewport',
      },
    },
  },
};

// Dark mode (if your app supports it)
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    mockHook: createMockHook({}),
    docs: {
      description: {
        story: 'Table displayed in dark mode',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};