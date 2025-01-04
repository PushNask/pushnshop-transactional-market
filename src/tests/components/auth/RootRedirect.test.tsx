import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RootRedirect } from '@/components/auth/RootRedirect';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@supabase/supabase-js';

// Mock the useAuth hook
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

// Create a mock user with all required properties
const createMockUser = (email: string): User => ({
  id: '1',
  email,
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  phone: '',
  confirmation_sent_at: null,
  confirmed_at: new Date().toISOString(),
  email_confirmed_at: new Date().toISOString(),
  phone_confirmed_at: null,
  identities: [],
  factors: []
});

describe('RootRedirect', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows loading state initially', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      userRole: null,
      loading: true,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      session: null
    });

    render(
      <BrowserRouter>
        <RootRedirect />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      userRole: null,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      session: null
    });

    render(
      <BrowserRouter>
        <RootRedirect />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('redirects admin users to admin dashboard', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: createMockUser('admin@test.com'),
      userRole: 'admin',
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      session: {} as any
    });

    render(
      <BrowserRouter>
        <RootRedirect />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/admin');
    });
  });

  it('redirects seller users to seller dashboard', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: createMockUser('seller@test.com'),
      userRole: 'seller',
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      session: {} as any
    });

    render(
      <BrowserRouter>
        <RootRedirect />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe('/seller');
    });
  });

  it('redirects to home after timeout if no role is assigned', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: createMockUser('user@test.com'),
      userRole: null,
      loading: false,
      signIn: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      session: {} as any
    });

    vi.useFakeTimers();
    
    render(
      <BrowserRouter>
        <RootRedirect />
      </BrowserRouter>
    );

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });

    vi.useRealTimers();
  });
});