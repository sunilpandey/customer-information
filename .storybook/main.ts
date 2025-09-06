import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  parameters: {
    vitest: {
      disabled: false,
    }
  },
  // Ensure Vitest is properly configured
  viteFinal: async (config) => {
    return {
      ...config,
      test: {
        environment: 'jsdom', // Required for React components
        setupFiles: [], // Add any Vitest setup files if needed
      },
    };
  },
};

export default config;