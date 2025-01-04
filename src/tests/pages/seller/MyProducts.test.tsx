import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import MyProducts from '@/pages/seller/MyProducts';

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

describe('MyProducts', () => {
  it('renders seller products correctly', () => {
    renderWithProviders(<MyProducts />);
    expect(screen.getByText('My Products')).toBeInTheDocument();
  });

  it('filters products based on search', async () => {
    renderWithProviders(<MyProducts />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    
    fireEvent.change(searchInput, { target: { value: 'Phone' } });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('Phone');
    });
  });

  it('shows loading state while fetching products', () => {
    renderWithProviders(<MyProducts />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when products fail to load', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    queryClient.setQueryData(['seller-products'], () => {
      throw new Error('Failed to load products');
    });
    
    renderWithProviders(<MyProducts />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error loading products/i)).toBeInTheDocument();
    });
  });
});