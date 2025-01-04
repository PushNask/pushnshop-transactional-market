import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

// Mock the entire supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => {
        const builder = {
          eq: vi.fn(() => builder),
          neq: vi.fn(() => builder),
          gt: vi.fn(() => builder),
          gte: vi.fn(() => builder),
          lt: vi.fn(() => builder),
          lte: vi.fn(() => builder),
          like: vi.fn(() => builder),
          ilike: vi.fn(() => builder),
          is: vi.fn(() => builder),
          in: vi.fn(() => builder),
          contains: vi.fn(() => builder),
          containedBy: vi.fn(() => builder),
          range: vi.fn(() => builder),
          textSearch: vi.fn(() => builder),
          filter: vi.fn(() => builder),
          not: vi.fn(() => builder),
          or: vi.fn(() => builder),
          order: vi.fn(() => builder),
          limit: vi.fn(() => builder),
          single: vi.fn(() => builder),
          maybeSingle: vi.fn(() => builder),
          then: vi.fn(() => Promise.resolve({ data: [], error: null })),
        } as unknown as PostgrestFilterBuilder<any>;
        return builder;
      }),
    })),
  },
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the homepage with search and filters', () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to PushNshop Marketplace')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  // Add more test cases as needed
});