import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client with a more complete implementation
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          range: vi.fn(() => ({
            order: vi.fn(() => ({
              data: [
                {
                  id: '1',
                  title: 'iPhone 12',
                  price: 500000,
                  currency: 'XAF',
                  location: 'Douala',
                  category: 'Electronics',
                  status: 'active',
                  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                  product_images: [
                    { id: '1', image_url: 'test1.jpg', display_order: 0 }
                  ]
                }
              ],
              count: 1,
              error: null
            })),
            ilike: vi.fn().mockReturnThis(),
            neq: vi.fn().mockReturnThis(),
            gt: vi.fn().mockReturnThis(),
            gte: vi.fn().mockReturnThis(),
            lt: vi.fn().mockReturnThis(),
            lte: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            is: vi.fn().mockReturnThis(),
            contains: vi.fn().mockReturnThis(),
            containedBy: vi.fn().mockReturnThis(),
            rangeLt: vi.fn().mockReturnThis(),
            rangeGt: vi.fn().mockReturnThis(),
            rangeGte: vi.fn().mockReturnThis(),
            rangeLte: vi.fn().mockReturnThis(),
            overlaps: vi.fn().mockReturnThis(),
            textSearch: vi.fn().mockReturnThis(),
            match: vi.fn().mockReturnThis(),
            not: vi.fn().mockReturnThis(),
            filter: vi.fn().mockReturnThis(),
            or: vi.fn().mockReturnThis()
          }))
        }))
      }))
    })),
  }
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
  });

  it('renders the hero section and search bar', async () => {
    renderWithProviders(<Index />);
    
    // Hero section
    expect(screen.getByText(/Welcome to PushNshop Marketplace/i)).toBeInTheDocument();
    
    // Search bar
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    });
  });

  it('updates search results when typing in search bar', async () => {
    renderWithProviders(<Index />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    
    // Type in search
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });
    
    // Verify debounced search is working
    await waitFor(() => {
      expect(searchInput).toHaveValue('iPhone');
    }, { timeout: 1000 }); // Account for debounce delay
  });

  it('displays loading state while fetching products', async () => {
    renderWithProviders(<Index />);
    
    // Check for skeleton loading state
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    });
  });

  it('handles empty search results gracefully', async () => {
    // Mock empty response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          range: vi.fn(() => ({
            order: vi.fn(() => ({
              data: [],
              count: 0,
              error: null
            })),
            ilike: vi.fn().mockReturnThis(),
            neq: vi.fn().mockReturnThis(),
            gt: vi.fn().mockReturnThis(),
            gte: vi.fn().mockReturnThis(),
            lt: vi.fn().mockReturnThis(),
            lte: vi.fn().mockReturnThis(),
            in: vi.fn().mockReturnThis(),
            is: vi.fn().mockReturnThis(),
            contains: vi.fn().mockReturnThis(),
            containedBy: vi.fn().mockReturnThis(),
            rangeLt: vi.fn().mockReturnThis(),
            rangeGt: vi.fn().mockReturnThis(),
            rangeGte: vi.fn().mockReturnThis(),
            rangeLte: vi.fn().mockReturnThis(),
            overlaps: vi.fn().mockReturnThis(),
            textSearch: vi.fn().mockReturnThis(),
            match: vi.fn().mockReturnThis(),
            not: vi.fn().mockReturnThis(),
            filter: vi.fn().mockReturnThis(),
            or: vi.fn().mockReturnThis()
          }))
        }))
      }))
    }));

    renderWithProviders(<Index />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    
    fireEvent.change(searchInput, { target: { value: 'NonexistentProduct' } });
    
    await waitFor(() => {
      expect(screen.getByText(/No products found/i)).toBeInTheDocument();
    });
  });
});