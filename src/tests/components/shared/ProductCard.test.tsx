import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/shared/ProductCard';

const mockProduct = {
  id: '1',
  title: 'iPhone 12',
  price: 500,
  currency: 'XAF',
  location: 'Douala',
  category: 'Electronics',
  description: 'A great phone',
  expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  status: 'active',
};

const mockImages = [
  { id: '1', image_url: 'image1.jpg', display_order: 0 },
  { id: '2', image_url: 'image2.jpg', display_order: 1 },
];

describe('ProductCard', () => {
  beforeEach(() => {
    // Mock navigator.share
    Object.defineProperty(window, 'navigator', {
      value: {
        share: vi.fn().mockImplementation(() => Promise.resolve()),
        clipboard: {
          writeText: vi.fn().mockImplementation(() => Promise.resolve()),
        },
      },
      writable: true,
    });
  });

  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} images={mockImages} />);
    
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
    expect(screen.getByText(/500/)).toBeInTheDocument();
    expect(screen.getByText('Douala')).toBeInTheDocument();
  });

  it('handles image carousel navigation', () => {
    render(<ProductCard product={mockProduct} images={mockImages} />);
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);
  });

  it('handles share functionality', async () => {
    render(<ProductCard product={mockProduct} images={mockImages} />);
    
    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);
    
    expect(window.navigator.share).toHaveBeenCalled();
  });
});