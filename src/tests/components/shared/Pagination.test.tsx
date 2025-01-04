import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

describe('Pagination', () => {
  it('renders pagination buttons correctly', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(2)}>2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('calls onPageChange when clicking a page number', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    
    fireEvent.click(screen.getByText('1'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});