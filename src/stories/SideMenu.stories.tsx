import type { Meta, StoryObj } from '@storybook/react-vite';
import { SideMenu } from '../components/common/SideMenu';
import FolderIcon from '@mui/icons-material/Folder';

const meta: Meta<typeof SideMenu> = {
  title: 'Components/SideMenu',
  component: SideMenu,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Text label for the menu item' },
    icon: { control: 'object', description: 'Icon element to display' },
    id: { control: 'text', description: 'Unique identifier for the menu item' },
    active: { control: 'boolean', description: 'Whether the menu item is active' },
    iconClick: { action: 'clicked', description: 'Callback when the menu item is clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    label: 'Menu Item',
    icon: <FolderIcon />,
    id: 'menu-1',
    active: false,
    iconClick: () => {},
  },
  render: (args) => (
    <div className="p-4">
      <ul>
        <SideMenu {...args} />
      </ul>
    </div>
  ),
};

export const Active: Story = {
  args: {
    label: 'Active Menu Item',
    icon: <FolderIcon />,
    id: 'menu-2',
    active: true,
    iconClick: () => {},
  },
  render: (args) => (
    <div className="p-4">
      <ul>
        <SideMenu {...args} />
      </ul>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <div className="p-4">
      <ul>
        <SideMenu
          label="Menu Item 1"
          icon={<FolderIcon />}
          id="menu-1"
          active={false}
          iconClick={args.iconClick}
        />
        <SideMenu
          label="Menu Item 2"
          icon={<FolderIcon />}
          id="menu-2"
          active={true}
          iconClick={args.iconClick}
        />
        <SideMenu
          label="Menu Item 3"
          icon={<FolderIcon />}
          id="menu-3"
          active={false}
          iconClick={args.iconClick}
        />
      </ul>
    </div>
  ),
  args: {
    iconClick: () => {},
  },
};