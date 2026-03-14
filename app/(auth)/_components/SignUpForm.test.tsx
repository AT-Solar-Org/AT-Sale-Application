import { render, screen, fireEvent, act } from '@testing-library/react';
import SignUpForm from '@/app/(auth)/_components/SignUpForm';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUpForm Component', () => {
  const mockPush = jest.fn();
  const mockOnSwitch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => null);
  });

  it('renders correctly', () => {
    act(() => {
      render(<SignUpForm onSwitch={mockOnSwitch} />);
    });
    expect(screen.getByRole('heading', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
  });

  it('validates password requirements and confirms match', () => {
    act(() => {
      render(<SignUpForm onSwitch={mockOnSwitch} />);
    });
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/^Password$/i);
    const confirmInput = screen.getByPlaceholderText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    // Fill in required fields to bypass HTML5 validation
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.change(confirmInput, { target: { value: 'weak2' } });
    
    // Simulate user blurring the input fields
    fireEvent.blur(passwordInput);
    fireEvent.blur(confirmInput);
    
    // Submit
    fireEvent.click(submitButton);

    // Expect error messages
    expect(screen.getByText(/Password does not meet all requirements/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('submits successfully with valid matching passwords', () => {
    act(() => {
      render(<SignUpForm onSwitch={mockOnSwitch} />);
    });
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/^Password$/i);
    const confirmInput = screen.getByPlaceholderText(/Confirm Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongPass1!' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongPass1!' } });
    
    fireEvent.click(submitButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('signupData', JSON.stringify({
      email: 'user@example.com',
      password: 'StrongPass1!'
    }));
    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  it('loads the initial email from localStorage', () => {
    (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify({ email: 'saved@example.com' }));
    
    act(() => {
      render(<SignUpForm onSwitch={mockOnSwitch} />);
    });

    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toHaveValue('saved@example.com');
  });
});
