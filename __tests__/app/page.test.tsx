import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// The home page renders the ComingSoonContent client component, which pulls in a
// heavy, timer/animation-driven coming-soon page. Stub it here so this test stays
// focused on the page composition (matching how child components are mocked
// elsewhere) rather than exercising the whole marketing surface under jsdom.
vi.mock('@/app/ComingSoonContent', () => ({
  default: () => <div data-testid="coming-soon">Coming Soon</div>,
}));

describe('Home Page', () => {
  it('should render home page', () => {
    render(<Home />);
    expect(screen.getByTestId('coming-soon')).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });
});
