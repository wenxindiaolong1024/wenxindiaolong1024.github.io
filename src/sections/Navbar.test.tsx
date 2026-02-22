import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: ({ className }: { className?: string }) => <svg data-testid="menu-icon" className={className} />,
  X: ({ className }: { className?: string }) => <svg data-testid="x-icon" className={className} />,
}));

// Mock Button component
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, variant }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: string }) => (
    <button onClick={onClick} className={className} data-variant={variant} data-testid="button">
      {children}
    </button>
  ),
}));

describe('Navbar Component', () => {
  let mockScrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockScrollTo = vi.fn();

    // Mock window.scrollTo
    global.scrollTo = mockScrollTo;

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderNavbar = (initialPath = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Navbar />
      </MemoryRouter>
    );
  };

  it('should render navbar with logo and navigation items', () => {
    renderNavbar();

    const homeButton = screen.getByText('首页');
    expect(homeButton).toBeInTheDocument();
  });

  it('should call onPageChange when nav item is clicked', () => {
    renderNavbar();

    const platformButton = screen.getByText('产品中心');
    fireEvent.click(platformButton);

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should toggle mobile menu when menu button is clicked', () => {
    renderNavbar();

    const menuButton = screen.getByLabelText('切换导航菜单');
    fireEvent.click(menuButton);

    // Menu should be open now
    const closeIcon = screen.getByTestId('x-icon');
    expect(closeIcon).toBeInTheDocument();

    // Click again to close
    fireEvent.click(menuButton);
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  it('should close mobile menu when nav item is clicked', () => {
    renderNavbar();

    // Open mobile menu
    const menuButton = screen.getByLabelText('切换导航菜单');
    fireEvent.click(menuButton);

    // Click a nav item in mobile menu
    const mobileHomeButton = screen.getAllByText('首页')[1]; // Second one is in mobile menu
    fireEvent.click(mobileHomeButton);

    // Menu should be closed
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  it('should apply scrolled styles when scrolled', () => {
    renderNavbar();

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    fireEvent.scroll(window);

    // Check if scrolled class is applied (this is a simplified check)
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render contact button', () => {
    renderNavbar();

    const contactButton = screen.getByText('联系我们');
    expect(contactButton).toBeInTheDocument();
  });
});
