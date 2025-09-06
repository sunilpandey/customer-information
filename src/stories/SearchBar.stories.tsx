import type { Meta } from '@storybook/react-vite';
import type { StoryObj } from '@storybook/react-vite';
import { SearchBar } from '../components/common/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    searchTerm: { control: 'text', description: 'The current search term' },
    onSearchTermChange: { action: 'searchTermChanged', description: 'Callback when search term changes' },
    placeHolder: { control: 'text', description: 'Placeholder text for the input' },
    debounceDelay: { control: 'number', description: 'Debounce delay in milliseconds' },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    searchTerm: '',
    onSearchTermChange: () => {},
    placeHolder: 'Search...',
    debounceDelay: 300,
  },
  render: (args) => (
    <div className="p-4">
      <SearchBar {...args} />
    </div>
  ),
};

export const WithInitialSearch: Story = {
  args: {
    searchTerm: 'Initial query',
    onSearchTermChange: () => {},
    placeHolder: 'Search...',
    debounceDelay: 300,
  },
  render: (args) => (
    <div className="p-4">
      <SearchBar {...args} />
    </div>
  ),
};

export const NoDebounce: Story = {
  args: {
    searchTerm: '',
    onSearchTermChange: () => {},
    placeHolder: 'Search without debounce',
    debounceDelay: 0,
  },
  render: (args) => (
    <div className="p-4">
      <SearchBar {...args} />
    </div>
  ),
};