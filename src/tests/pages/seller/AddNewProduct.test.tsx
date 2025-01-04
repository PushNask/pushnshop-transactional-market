import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AddNewProduct from '@/pages/seller/AddNewProduct';

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

describe('AddNewProduct', () => {
  it('renders the form correctly', () => {
    renderWithProviders(<AddNewProduct />);
    
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
  });

  it('handles form submission with validation', async () => {
    renderWithProviders(<AddNewProduct />);
    
    const submitButton = screen.getByRole('button', { name: /Add Product/i });
    fireEvent.click(submitButton);

    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });
  });

  it('handles image upload', async () => {
    renderWithProviders(<AddNewProduct />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Product Images/i);
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText(/1 image\(s\) selected/i)).toBeInTheDocument();
    });
  });
});