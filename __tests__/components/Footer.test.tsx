import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('should render footer', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render company name', () => {
    render(<Footer />);
    const companyName = screen.getByText(/foxes technology/i);
    expect(companyName).toBeInTheDocument();
  });

  it('should render copyright information', () => {
    render(<Footer />);
    const copyright = screen.getByText(/©/);
    expect(copyright).toBeInTheDocument();
  });

  it('should render footer links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(5); // Footer should have multiple links
  });

  it('should have Solutions section', () => {
    render(<Footer />);
    const solutionsHeading = screen.getByRole('heading', { name: 'Solutions' });
    expect(solutionsHeading).toBeInTheDocument();
  });

  it('should have Company section', () => {
    render(<Footer />);
    const companyHeading = screen.getByText(/company/i);
    expect(companyHeading).toBeInTheDocument();
  });

  it('should have Privacy Policy link', () => {
    render(<Footer />);
    const privacyLink = screen.getByRole('link', { name: /privacy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });

  it('should have Terms link', () => {
    render(<Footer />);
    const termsLink = screen.getByRole('link', { name: /terms/i });
    expect(termsLink).toBeInTheDocument();
  });

  it('should render current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    const copyrightText = screen.getByText(new RegExp(currentYear));
    expect(copyrightText).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });
});
