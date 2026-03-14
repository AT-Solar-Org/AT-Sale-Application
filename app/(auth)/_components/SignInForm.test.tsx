import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from '@/app/(auth)/_components/SignInForm';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignInForm Component', () => {
  const mockPush = jest.fn();
  const mockOnSwitch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  it('renders the SignInForm with essential elements', () => {
    render(<SignInForm onSwitch={mockOnSwitch} />);
    
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('allows the user to toggle password visibility', () => {
    render(<SignInForm onSwitch={mockOnSwitch} />);
    
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByLabelText(/Toggle password visibility/i);
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('simulates a successful sign in and routes to /pending', () => {
    render(<SignInForm onSwitch={mockOnSwitch} />);
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(signInButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('accountStatus', 'pending');
    expect(localStorage.setItem).toHaveBeenCalledWith('emailVerified', 'true');
    expect(mockPush).toHaveBeenCalledWith('/pending');
  });

  it('triggers onSwitch when "Don\'t have an account?" is clicked', () => {
    render(<SignInForm onSwitch={mockOnSwitch} />);
    
    const switchButton = screen.getByRole('button', { name: /Don't have an account\?/i });
    fireEvent.click(switchButton);

    expect(mockOnSwitch).toHaveBeenCalledTimes(1);
  });
});
