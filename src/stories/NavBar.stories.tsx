import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar } from '../components/common/NavBar';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import React from 'react';

// Create a mock i18n instance for Storybook
const mockI18n = i18n.createInstance();

mockI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: {
        greeting: 'Hello, {{name}}'
      }
    },
    es: {
      common: {
        greeting: 'Hola, {{name}}'
      }
    },
    fr: {
      common: {
        greeting: 'Bonjour, {{name}}'
      }
    }
  },
  interpolation: {
    escapeValue: false
  }
});

// Decorator to wrap stories in I18nextProvider
const withI18n = (Story: any, context: any) => {
  const { locale } = context.globals;
  
  React.useEffect(() => {
    mockI18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={mockI18n}>
      <Story />
    </I18nextProvider>
  );
};

const meta = {
  title: 'Components/NavBar',
  component: NavBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Navigation bar component with user greeting and search functionality'
      }
    }
  },
  decorators: [withI18n],
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'The name of the user to display in the greeting'
    }
  }
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    userName: 'John'
  }
};

// Story with a long name
export const LongUserName: Story = {
  args: {
    userName: 'Alexandra Benjamin'
  }
};

// Story with a short name
export const ShortUserName: Story = {
  args: {
    userName: 'Al'
  }
};

// Story for different locales
export const SpanishLocale: Story = {
  args: {
    userName: 'Carlos'
  },
  parameters: {
    docs: {
      description: {
        story: 'NavBar with Spanish locale. Change the locale using the toolbar globe icon.'
      }
    }
  },
  globals: {
    locale: 'es'
  }
};

export const FrenchLocale: Story = {
  args: {
    userName: 'Pierre'
  },
  parameters: {
    docs: {
      description: {
        story: 'NavBar with French locale. Change the locale using the toolbar globe icon.'
      }
    }
  },
  globals: {
    locale: 'fr'
  }
};

// Story with special characters
export const SpecialCharacters: Story = {
  args: {
    userName: 'José María'
  }
};

// Story with emoji in name
export const WithEmoji: Story = {
  args: {
    userName: 'Sarah 🌟'
  }
};

// Mobile view story
export const MobileView: Story = {
  args: {
    userName: 'Mobile User'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Tablet view story
export const TabletView: Story = {
  args: {
    userName: 'Tablet User'
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};