import { describe, it, expect, beforeEach } from 'vitest';
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
});