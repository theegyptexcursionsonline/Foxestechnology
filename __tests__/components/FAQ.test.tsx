import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '@/components/FAQ';

describe('FAQ Component', () => {
  it('should render FAQ section', () => {
    render(<FAQ />);
    const faqSection = screen.getByText(/frequently asked/i);
    expect(faqSection).toBeInTheDocument();
  });

  it('should render FAQ heading', () => {
    render(<FAQ />);
    const heading = screen.getByText(/frequently asked/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render FAQ items', () => {
    render(<FAQ />);
    const questions = screen.getAllByRole('heading', { level: 3 });
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should have collapsible FAQ items', () => {
    render(<FAQ />);
    // Each accordion question sits in a clickable header
    const question = screen.getByText(/how long does it take to get started/i);
    expect(question.closest('header')).not.toBeNull();
  });

  it('should toggle FAQ item on click', () => {
    render(<FAQ />);
    // Second item starts collapsed; clicking its header reveals the answer
    const question = screen.getByText(/suitable for a single, independent tour guide/i);
    const header = question.closest('header');
    expect(header).not.toBeNull();
    expect(
      screen.queryByText(/our platform is fully scalable/i)
    ).not.toBeInTheDocument();
    fireEvent.click(header as HTMLElement);
    expect(screen.getByText(/our platform is fully scalable/i)).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = render(<FAQ />);
    expect(container).toBeInTheDocument();
  });
});
