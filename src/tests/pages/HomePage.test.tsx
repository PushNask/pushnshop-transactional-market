import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';

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
  });

  it('renders the hero section and search bar', () => {
    renderWithProviders(<Index />);
    expect(screen.getByText(/Welcome to PushNshop Marketplace/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search products/i)).toBeInTheDocument();
  });

  it('updates search results when typing in search bar', async () => {
    renderWithProviders(<Index />);
    const searchInput = screen.getByPlaceholderText(/Search products/i);
    
    fireEvent.change(searchInput, { target: { value: 'Phone' } });
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('Phone');
    });
  });

  it('handles pagination correctly', async () => {
    renderWithProviders(<Index />);
    const nextPageButton = screen.getByRole('button', { name: /next/i });
    
    fireEvent.click(nextPageButton);
    
    await waitFor(() => {
      expect(queryClient.getQueryData(['products'])).toBeDefined();
    });
  });

  it('applies filters correctly', async () => {
    renderWithProviders(<Index />);
    const filterButton = screen.getByRole('button', { name: /filters/i });
    
    fireEvent.click(filterButton);
    
    const categorySelect = screen.getByRole('combobox', { name: /category/i });
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });
    
    await waitFor(() => {
      expect(queryClient.getQueryData(['products'])).toBeDefined();
    });
  });
});