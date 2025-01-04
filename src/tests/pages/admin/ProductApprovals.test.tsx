import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductApprovals from '@/pages/admin/ProductApprovals';

const mockPendingProducts = [
  {
    id: 1,
    title: 'iPhone 13 Pro',
    description: 'Brand new iPhone',
    price: 999,
    seller: {
      name: 'John Doe',
      location: 'Douala',
    },
    status: 'Pending Payment',
  },
];

describe('ProductApprovals', () => {
  it('renders pending products correctly', () => {
    render(<ProductApprovals />);
    expect(screen.getByText('Product Approvals')).toBeInTheDocument();
  });

  it('displays product details in the table', () => {
    render(<ProductApprovals />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Seller')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('opens product details modal on row click', async () => {
    render(<ProductApprovals />);
    const productRow = screen.getByText('iPhone 13 Pro');
    fireEvent.click(productRow);
    
    await waitFor(() => {
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });
  });

  it('handles product approval', async () => {
    render(<ProductApprovals />);
    const approveButton = screen.getByRole('button', { name: /approve/i });
    
    fireEvent.click(approveButton);
    
    await waitFor(() => {
      expect(screen.getByText(/approved/i)).toBeInTheDocument();
    });
  });
});