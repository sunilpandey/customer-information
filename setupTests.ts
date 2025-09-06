import '@testing-library/jest-dom';

// The following is necessary for mocking hooks with Vitest
// The 'vi' object is Vitest's equivalent of Jest's 'jest' object.
import { vi } from 'vitest';

// You would add your specific mocks here.
// For example, to mock the hooks in your storybook:
vi.mock('../../context/hooks/useCustomerAggregatorService', () => ({
  useCustomerAggregatorService: vi.fn(),
}));

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useQuery: vi.fn(),
  };
});