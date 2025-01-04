import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
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
                  category: 'electronics',
                  status: 'active',
                  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                  product_images: [
                    { id: '1', image_url: 'test1.jpg', display_order: 0 }
                  ]
                }
              ],
              count: 1,
              error: null
            }))
          }))
        }))
      }))
    })
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

  it('filters products by category', async () => {
    renderWithProviders(<Index />);
    
    // Open filters
    const filterButton = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterButton);
    
    // Select category
    const categorySelect = screen.getByRole('button', { name: /Electronics/i });
    fireEvent.click(categorySelect);
    
    // Verify filtered results
    await waitFor(() => {
      expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    });
  });

  it('handles pagination correctly', async () => {
    renderWithProviders(<Index />);
    
    // Wait for initial products to load
    await waitFor(() => {
      expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    });
    
    // Find and click next page button
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    // Verify page change
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalled();
    });
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
            }))
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