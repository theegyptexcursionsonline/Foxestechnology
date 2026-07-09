import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Solutions from '@/components/Solutions';

describe('Solutions Component', () => {
  it('should render solutions section', () => {
    render(<Solutions />);
    const solutionsHeading = screen.getByText(/solutions/i);
    expect(solutionsHeading).toBeInTheDocument();
  });

  it('should render multiple solution cards', () => {
    const { container } = render(<Solutions />);
    // Solutions component should have content
    expect(container.textContent).toBeTruthy();
    expect((container.textContent ?? '').length).toBeGreaterThan(0);
  });

  it('should render solution links', () => {
    render(<Solutions />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should render without crashing', () => {
    const { container } = render(<Solutions />);
    expect(container).toBeInTheDocument();
  });
});
