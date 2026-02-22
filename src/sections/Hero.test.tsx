import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from './Hero';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: ({ className }: { className?: string }) => <svg data-testid="arrow-right" className={className} />,
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Hero Component', () => {
  beforeEach(() => {
    // Mock window.location.href
    delete (window as Partial<Window>).location;
    (window as typeof globalThis).location = { href: '' } as Location;

    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn(() => Promise.resolve()),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render with default props', () => {
    render(<Hero />);

    expect(screen.getByText('磐络™')).toBeInTheDocument();
    expect(screen.getByText(/统一网络、安全、身份与可视化能力/)).toBeInTheDocument();
  });

  it('should render with custom title and subtitle', () => {
    render(<Hero title="Custom Title" subtitle="Custom Subtitle" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
  });

  it('should not render legacy stats section', () => {
    render(<Hero />);

    expect(screen.queryByText('150+')).not.toBeInTheDocument();
  });

  it('should render CTA link when showCTA is true', () => {
    render(<Hero showCTA={true} />);

    const ctaLink = screen.getByRole('link', { name: /申请试用/ });
    expect(ctaLink).toBeInTheDocument();
  });

  it('should not render CTA link when showCTA is false', () => {
    render(<Hero showCTA={false} />);

    const ctaLink = screen.queryByRole('link', { name: /申请试用/ });
    expect(ctaLink).not.toBeInTheDocument();
  });

  it('should call window.location.href on CTA button click', () => {
    render(<Hero showCTA={true} />);

    const ctaLink = screen.getByRole('link', { name: /申请试用/ });
    fireEvent.click(ctaLink);

    expect(window.location.href).toBe('mailto:business@unisase.cn?subject=UniSASE试用申请');
  });

  it('should split title correctly when it contains —— separator', () => {
    render(<Hero title="First——Second" />);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('should handle title without separator', () => {
    render(<Hero title="Single Title" />);

    expect(screen.getByText('Single Title')).toBeInTheDocument();
    expect(screen.getByText('坚如磐石的网络与安全')).toBeInTheDocument();
  });

  it('should render Hero section with correct CSS classes', () => {
    const { container } = render(<Hero />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-screen');
    expect(section).toHaveClass('flex');
    expect(section).toHaveClass('items-center');
  });

  it('should render UniSASE branding text', () => {
    render(<Hero />);

    expect(screen.getByText(/UniSASE/)).toBeInTheDocument();
    expect(screen.getByText('坚如磐石的网络与安全')).toBeInTheDocument();
  });

  it('should render floating badge', () => {
    render(<Hero />);

    expect(screen.getByText('坚如磐石')).toBeInTheDocument();
  });

  it('should initialize canvas element', () => {
    const { container } = render(<Hero />);

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should handle resize events without crashing', () => {
    render(<Hero />);

    expect(() => {
      window.dispatchEvent(new Event('resize'));
    }).not.toThrow();
  });

  it('should not render enterprise SASE badge', () => {
    render(<Hero />);

    expect(screen.queryByText('企业级 SASE 解决方案')).not.toBeInTheDocument();
  });

  it('should render arrow icon in CTA button', () => {
    render(<Hero showCTA={true} />);

    const arrowIcon = screen.getByTestId('arrow-right');
    expect(arrowIcon).toBeInTheDocument();
  });

  it('should handle empty title gracefully', () => {
    render(<Hero title="" />);

    const subtitle = screen.getByText(/统一网络、安全、身份与可视化能力/);
    expect(subtitle).toBeInTheDocument();
  });

  it('should handle empty subtitle gracefully', () => {
    render(<Hero subtitle="" />);

    const title = screen.getByText('磐络™');
    expect(title).toBeInTheDocument();
  });

  it('should render main visual section', () => {
    const { container } = render(<Hero />);

    const mainVisual = container.querySelector('.bg-gradient-to-br');
    expect(mainVisual).toBeInTheDocument();
  });

  it('should set isVisible state on mount', () => {
    render(<Hero />);

    // The component should be visible after initial render
    const { container } = render(<Hero />);
    const content = container.querySelector('.opacity-100');
    expect(content).toBeInTheDocument();
  });

  it('should cleanup canvas on unmount', () => {
    const { unmount } = render(<Hero />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
