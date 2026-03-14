import { render, screen, act } from '@testing-library/react';
import PendingApproval from '@/app/(auth)/_components/PendingApproval';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PendingApproval Component', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('redirects to /auth if the user is not in pending status', () => {
    (Storage.prototype.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'accountStatus') return 'approved'; // not pending
      if (key === 'emailVerified') return 'true';
      return null;
    });

    render(<PendingApproval />);
    
    expect(mockReplace).toHaveBeenCalledWith('/auth');
  });

  it('displays the waiting screen if user is pending and simulates approval', async () => {
    (Storage.prototype.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'accountStatus') return 'pending';
      if (key === 'emailVerified') return 'true';
      if (key === 'pendingEmail') return 'test@example.com';
      return null;
    });

    render(<PendingApproval />);

    // Initial state: Waiting
    expect(screen.getByText(/Awaiting Approval/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Listening for approval/i)).toBeInTheDocument();

    // Fast-forward 3 seconds for the "approval"
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // After 3 seconds it should say "Account Approved"
    expect(screen.getByText(/Account Approved!/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin approved!/i)).toBeInTheDocument();

    // Fast-forward another 2 seconds for the redirection
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('accountStatus');
    expect(localStorage.removeItem).toHaveBeenCalledWith('pendingEmail');
    expect(localStorage.removeItem).toHaveBeenCalledWith('emailVerified');
    expect(localStorage.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
