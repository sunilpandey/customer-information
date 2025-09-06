import type { Meta, StoryObj } from '@storybook/react-vite';
import { TrendInfo } from '../components/common/TrendInfo';

const meta: Meta<typeof TrendInfo> = {
  title: 'Components/TrendInfo',
  component: TrendInfo,
  tags: ['autodocs'],
  argTypes: {
    increase: { control: 'number', description: 'Percentage change in trend' },
    durationText: { 
      control: 'select', 
      options: ['today', 'this month', 'this year'], 
      description: 'Time period for the trend'
    },
  },
};

export default meta;

type Story = StoryObj<typeof TrendInfo>;

export const PositiveTrend: Story = {
  args: {
    increase: 10,
    durationText: 'today',
  },
  render: (args) => (
    <div className="p-4">
      <TrendInfo {...args} />
    </div>
  ),
};

export const NegativeTrend: Story = {
  args: {
    increase: -5,
    durationText: 'this month',
  },
  render: (args) => (
    <div className="p-4">
      <TrendInfo {...args} />
    </div>
  ),
};

export const YearlyTrend: Story = {
  args: {
    increase: 25,
    durationText: 'this year',
  },
  render: (args) => (
    <div className="p-4">
      <TrendInfo {...args} />
    </div>
  ),
};