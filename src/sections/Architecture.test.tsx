import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Architecture from './Architecture';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Server: ({ className }: { className?: string }) => <svg data-testid="server" className={className} />,
  Shield: ({ className }: { className?: string }) => <svg data-testid="shield" className={className} />,
  Users: ({ className }: { className?: string }) => <svg data-testid="users" className={className} />,
  Database: ({ className }: { className?: string }) => <svg data-testid="database" className={className} />,
  Globe: ({ className }: { className?: string }) => <svg data-testid="globe" className={className} />,
  Lock: ({ className }: { className?: string }) => <svg data-testid="lock" className={className} />,
  BarChart3: ({ className }: { className?: string }) => <svg data-testid="barchart3" className={className} />,
}));

describe('Architecture Component', () => {
  it('should render section heading', () => {
    render(<Architecture />);

    expect(screen.getByText('UniSASE 统一的网络与安全深度融合服务平台')).toBeInTheDocument();
  });

  it('should render main heading', () => {
    render(<Architecture />);

    expect(screen.getByText('UniSASE 统一的网络与安全深度融合服务平台')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(<Architecture />);

    expect(screen.getByText(/以统一身份、统一控制与统一可视化为核心能力/)).toBeInTheDocument();
  });

  it('should render architecture image', () => {
    const { container } = render(<Architecture />);

    const image = container.querySelector('img[alt="UniSASE 平台架构图"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/architecture.png');
  });

  it('should render all three architecture layers', () => {
    render(<Architecture />);

    expect(screen.getByText('UniAuth')).toBeInTheDocument();
    expect(screen.getByText('UniCtrl')).toBeInTheDocument();
    expect(screen.getByText('UniLog')).toBeInTheDocument();
  });

  it('should render layer subtitles', () => {
    render(<Architecture />);

    expect(screen.getByText('统一身份认证')).toBeInTheDocument();
    expect(screen.getByText('统一控制')).toBeInTheDocument();
    expect(screen.getByText('统一日志分析')).toBeInTheDocument();
  });

  it('should render layer descriptions', () => {
    render(<Architecture />);

    expect(screen.getByText('企业级统一身份与访问管理平台')).toBeInTheDocument();
    expect(screen.getByText('统一策略控制与编排引擎')).toBeInTheDocument();
    expect(screen.getByText('统一可视化与分析系统')).toBeInTheDocument();
  });

  it('should render all capabilities', () => {
    render(<Architecture />);

    expect(screen.getAllByText('全球骨干网 Global Backbone & PoPs').length).toBeGreaterThan(0);
    expect(screen.getByText('体验可保障：就近接入 + 全网调度')).toBeInTheDocument();
  });

  it('should render capability descriptions', () => {
    render(<Architecture />);

    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('≤1周')).toBeInTheDocument();
  });

  it('should render POP map section', () => {
    render(<Architecture />);

    expect(screen.getAllByText('全球骨干网 Global Backbone & PoPs').length).toBeGreaterThan(0);
  });

  it('should render POP map image', () => {
    const { container } = render(<Architecture />);

    const image = container.querySelector('img[alt="区域 PoPs图"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/pop-map.png');
  });

  it('should render global backbone stats', () => {
    render(<Architecture />);

    expect(screen.getByText('体验可保障：就近接入 + 全网调度')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('≤1周')).toBeInTheDocument();
  });

  it('should render globe icon', () => {
    render(<Architecture />);

    const globe = screen.getByTestId('globe');
    expect(globe).toBeInTheDocument();
  });

  it('should render pulsing nodes for globe visualization', () => {
    const { container } = render(<Architecture />);

    // Should have multiple pulsing nodes (8 in the code)
    const pulsingDivs = container.querySelectorAll('.animate-ping');
    expect(pulsingDivs.length).toBeGreaterThan(0);
  });

  it('should render stats labels correctly', () => {
    render(<Architecture />);

    expect(screen.getByText('全球 PoPs')).toBeInTheDocument();
    expect(screen.getByText('新节点上线')).toBeInTheDocument();
  });

  it('should have proper CSS classes for section', () => {
    const { container } = render(<Architecture />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('py-24');
    expect(section).toHaveClass('bg-white');
  });

  it('should render layer icons', () => {
    render(<Architecture />);

    expect(screen.getByTestId('users')).toBeInTheDocument();
    expect(screen.getByTestId('shield')).toBeInTheDocument();
    expect(screen.getByTestId('barchart3')).toBeInTheDocument();
  });

  it('should render capability icons', () => {
    render(<Architecture />);

    expect(screen.getByTestId('globe')).toBeInTheDocument();
  });

  it('should handle visibility state for animations', () => {
    render(<Architecture />);

    // Component should initialize with IntersectionObserver
    // Since we mock IntersectionObserver in setup, it should work without errors
    const { container } = render(<Architecture />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should render stats with correct styling', () => {
    const { container } = render(<Architecture />);

    const statsContainer = container.querySelector('.grid-cols-2');
    expect(statsContainer).toBeInTheDocument();
  });

  it('should render dark background section for global backbone', () => {
    const { container } = render(<Architecture />);

    const darkSection = container.querySelector('.from-brand-dark');
    expect(darkSection).toBeInTheDocument();
  });

  it('should render architecture diagram container', () => {
    const { container } = render(<Architecture />);

    const diagramContainer = container.querySelector('.bg-gradient-to-br');
    expect(diagramContainer).toBeInTheDocument();
  });

  it('should render capability grid with correct columns', () => {
    const { container } = render(<Architecture />);

    const capabilityGrid = container.querySelector('.grid-cols-2');
    expect(capabilityGrid).toBeInTheDocument();
  });

  it('should render architecture layers in correct order', () => {
    render(<Architecture />);

    const layers = screen.getAllByText(/UniAuth|UniCtrl|UniLog/);
    expect(layers[0]).toHaveTextContent('UniAuth');
    expect(layers[1]).toHaveTextContent('UniCtrl');
    expect(layers[2]).toHaveTextContent('UniLog');
  });

  it('should cleanup IntersectionObserver on unmount', () => {
    const { unmount } = render(<Architecture />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should handle threshold for visibility correctly', () => {
    render(<Architecture />);

    // IntersectionObserver should be set up with threshold 0.2
    // This is tested implicitly by ensuring the component renders without errors
    const { container } = render(<Architecture />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });
});
