import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ComingSoonModal from '@/components/ComingSoonModal';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  Toaster: () => null,
}));

describe('ComingSoonModal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should render modal when isOpen is true', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<ComingSoonModal isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('should show the notify description', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/get notified/i)).toBeInTheDocument();
  });

  it('should render email input field', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('should render notify button', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    const notifyButton = screen.getByRole('button', { name: /notify me/i });
    expect(notifyButton).toBeInTheDocument();
  });

  it('should render close button', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    const closeButtons = screen.getAllByRole('button');
    expect(closeButtons.length).toBeGreaterThan(0);
  });

  it('should call onClose when the backdrop is clicked', () => {
    const { container } = render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    // Backdrop is the first fixed overlay element
    const backdrop = container.querySelector('.fixed.inset-0.z-50.bg-black\\/60');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as Element);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should accept email input', () => {
    render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should render without crashing', () => {
    const { container } = render(<ComingSoonModal isOpen={true} onClose={mockOnClose} />);
    expect(container).toBeInTheDocument();
  });
});
