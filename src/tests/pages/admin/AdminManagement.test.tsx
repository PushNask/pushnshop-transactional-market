import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminManagement from '@/pages/admin/AdminManagement';

describe('AdminManagement', () => {
  it('renders the admin creation form', () => {
    render(<AdminManagement />);
    expect(screen.getByText('Create Admin Account')).toBeInTheDocument();
  });

  it('displays existing admins', async () => {
    render(<AdminManagement />);
    expect(screen.getByText('Existing Admins')).toBeInTheDocument();
  });

  it('validates admin creation form', async () => {
    render(<AdminManagement />);
    const submitButton = screen.getByRole('button', { name: /Create Admin Account/i });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it('creates a new admin successfully', async () => {
    render(<AdminManagement />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /Create Admin Account/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Admin account created successfully/i)).toBeInTheDocument();
    });
  });
});