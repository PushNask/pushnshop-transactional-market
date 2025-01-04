import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';

// Mock the supabase client
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
          then: vi.fn(() => Promise.resolve({ 
            data: [], 
            error: null,
            count: 0 
          })) as unknown as PostgrestFilterBuilder<
            Database,
            Database['public']['Tables']['products']['Row'],
            Database['public']['Tables']['products']['Row'][],
            'products',
            Database['public']['Tables']['products']['Relationships']
          >['then']
        } as unknown as PostgrestFilterBuilder<
          Database,
          Database['public']['Tables']['products']['Row'],
          Database['public']['Tables']['products']['Row'][],
          'products',
          Database['public']['Tables']['products']['Relationships']
        >;
        return builder;
      }),
    })),
  },
}));

// Mock react-query
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn().mockReturnValue({
      data: {
        products: [],
        count: 0
      },
      isLoading: false,
      error: null,
    }),
  };
});

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

  it('updates search results when typing in search input', async () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(searchInput).toHaveValue('test');
    });
  });

  // Add more test cases as needed
});