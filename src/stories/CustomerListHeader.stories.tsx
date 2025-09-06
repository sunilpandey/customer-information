import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerListHeader } from '../components/customers/table/CustomerListHeader';
import { SORT_ORDERS } from '../core/constants';

// Mock SearchBar component
const MockSearchBar = ({ onSearchTermChange, searchTerm, placeHolder }: any) => (
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => onSearchTermChange(e.target.value)}
    placeholder={placeHolder}
    className="border rounded px-2 py-1"
  />
);

// Mock useTranslation hook
const mockUseTranslation = () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      All_Customers: 'All Customers',
      Active_Members: 'Active Members',
      Search_company: 'Search by company',
      Sort_By: 'Sort By',
      Newest: 'Newest',
      Oldest: 'Oldest',
    };
    return translations[key] || key;
  },
});

// Mock react-i18next context
const I18nextProvider = ({ children }: { children: React.ReactNode }) => {
  const value = { t: mockUseTranslation().t };
  return <>{children}</>;
};

const meta = {
  title: 'Components/CustomerListHeader',
  component: CustomerListHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A header component for the customer list, including a search bar and sort order selector with i18n support',
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider>
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CustomerListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sortOrder: SORT_ORDERS.DESC,
    onSortOrderChange: () => {},
    searchTerm: '',
    onSearchTermChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default rendering of the CustomerListHeader with empty search term and descending sort order',
      },
    },
  },
};

export const AscendingSort: Story = {
  args: {
    sortOrder: SORT_ORDERS.ASC,
    onSortOrderChange: () => {},
    searchTerm: '',
    onSearchTermChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'CustomerListHeader with ascending sort order',
      },
    },
  },
};

export const WithSearchTerm: Story = {
  args: {
    sortOrder: SORT_ORDERS.DESC,
    onSortOrderChange: () => {},
    searchTerm: 'Acme',
    onSearchTermChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'CustomerListHeader with a populated search term',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    sortOrder: SORT_ORDERS.DESC,
    onSortOrderChange: () => {},
    searchTerm: '',
    onSearchTermChange: () => {},
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'CustomerListHeader displayed on a mobile viewport',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    sortOrder: SORT_ORDERS.DESC,
    onSortOrderChange: () => {},
    searchTerm: '',
    onSearchTermChange: () => {},
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'CustomerListHeader displayed in dark mode',
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider>
        <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '20px' }}>
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
};

// Patch the component to use the mocked SearchBar
const OriginalCustomerListHeader = CustomerListHeader;
(CustomerListHeader as any).defaultProps = {
  ...CustomerListHeader.defaultProps,
  SearchBar: MockSearchBar,
};

export { OriginalCustomerListHeader as CustomerListHeader };